import { Injectable, HttpService } from '@nestjs/common';
import { map, mergeMap } from 'rxjs/operators';
import { iif, of } from 'rxjs';
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
    private http: HttpService,
    private characterService: CharacterService,
    private authService: AuthService,
  ) {}

  private url = 'https://esi.evetech.net/latest';

  getOnline = (id: number) =>
    this.accessEsiWithAuth<any>(`characters/${id}/online`, id).pipe(
      map(data => data.online),
    );

  accessEsiWithAuth = <T>(path: string, id: number) =>
    this.characterService.checkToken(id).pipe(
      mergeMap(val =>
        iif(() => val, this.authService.refreshToken(id), of({})),
      ),
      mergeMap(() => this.characterService.findCharacter(id)),
      mergeMap(val =>
        this.http.get<T>(`${this.url}/${path}`, {
          headers: {
            Authorization: `Bearer ${val.esiAccessToken}`,
          },
        }),
      ),
      map(val => val.data),
    );
}
