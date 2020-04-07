import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Esi } from './esi.interface';
import { map, mergeMap, retry, combineAll, retryWhen } from 'rxjs/operators';
import { from, iif, of } from 'rxjs';
import { CorporationService } from '../corporation/corporation.service';
import { AllianceService } from '../alliance/alliance.service';
import { CharacterService } from '../character/character.service';
import { AuthService } from 'src/auth/auth.service';

export class AllianceModel {
  creator_corporation_id: number;
  allianceId?: number;
  creator_id: number;
  date_founded: Date;
  executor_corporation_id: number;
  name: string;
  ticker: string;
  faction_id?: number;
  corps?: CorporationModel[];
}

export class CorporationModel {
  alliance_id: number;
  corporationId?: number;
  ceo_id: number;
  creator_id: number;
  date_founded: Date;
  description: string;
  home_station_id: number;
  member_count: number;
  name: string;
  shares: number;
  tax_rate: number;
  ticker: string;
  faction_id?: number;
  url: string;
}

@Injectable()
export class EsiService {
  constructor(
    @InjectModel('Esi')
    private esiModel: Model<Esi>,
    private http: HttpService,
    private corpService: CorporationService,
    private allianceService: AllianceService,
    private characterService: CharacterService,
    private authService: AuthService,
  ) {}

  private url = 'https://esi.evetech.net/latest';

  getLocation = (id: number) =>
    this.accessEsiWithAuth<any>(`characters/${id}/location`, id).pipe(
      map(data => data.solar_system_id),
    );

  accessEsiWithAuth = <T>(path: string, id: number) =>
  this.characterService.checkToken(id).pipe(
    mergeMap(val => iif(() => val, this.authService.refreshToken(id), of({}))),
    mergeMap(() => this.characterService.findCharacter(id)),
    mergeMap(val => this.http.get<T>(`${this.url}/${path}`, {
      headers: {
        Authorization: `Bearer ${val.esiAccessToken}`,
      },
    })),
    map(val => val.data)
  )

  getNAlliances = (start: number, end?: number) =>
    this.getAllAlliances().pipe(
      map(alliances => alliances.sort().slice(start, end)),
      mergeMap(alliances =>
        from(alliances).pipe(
          mergeMap(this.getAllianceInfo),
          map(this.allianceService.saveAlliance),
          combineAll(),
        ),
      ),
      map(alliances => alliances.map(alliance => alliance.allianceId)),
      mergeMap(alliances =>
        from(alliances).pipe(
          mergeMap(this.getCorporations),
          mergeMap(corporations =>
            from(corporations).pipe(
              mergeMap(this.getCorporationInfo),
              map(this.corpService.saveCorporation),
              combineAll(),
            ),
          ),
          combineAll(),
        ),
      ),
    );

  private getAllAlliances = () =>
    this.http.get<number[]>(`${this.url}/alliances`).pipe(map(val => val.data));

  private getAllianceInfo = (allianceId: number) =>
    this.http.get<AllianceModel>(`${this.url}/alliances/${allianceId}`).pipe(
      map(dat => dat.data),
      retry(10),
      map(val => ({
        allianceId: allianceId,
        allianceName: val.name,
        ticker: val.ticker,
        dateFounded: val.date_founded,
        factionId: val.faction_id,
      })),
    );

  private getCorporations = (allianceId: number) =>
    this.http
      .get<number[]>(`${this.url}/alliances/${allianceId}/corporations`)
      .pipe(map(val => val.data));

  private getCorporationInfo = (corporationId: number, allianceId: number) =>
    this.http
      .get<CorporationModel>(`${this.url}/corporations/${corporationId}`)
      .pipe(
        map(dat => dat.data),
        retry(10),
        map(corpInfo => ({
          corporationId: corporationId,
          corporationName: corpInfo.name,
          ticker: corpInfo.ticker,
          dateFounded: corpInfo.date_founded,
          memberCount: corpInfo.member_count,
          isNPC: false,
          allianceId: allianceId,
          factionId: corpInfo.faction_id,
        })),
      );
}
