import { Injectable, HttpService, Inject } from '@nestjs/common';
import { map, mergeMap } from 'rxjs/operators';
import { iif, of } from 'rxjs';
import { CharacterService } from '../character/character.service';
import { AuthService } from 'src/auth/auth.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class EsiService {
  constructor(
    private http: HttpService,
    private characterService: CharacterService,
    private authService: AuthService,
    @Inject('PUB_SUB') private pubSub: RedisPubSub,
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

  test = () => {
    this.pubSub.subscribe
  }
}
