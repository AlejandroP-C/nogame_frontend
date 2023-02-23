import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { Planet } from '../interfaces/planet';
import { Player } from '../interfaces/player';
import { User } from '../interfaces/user';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class SpringService {

  constructor(
    private http: HttpClient,
    private localService: LocalService) {
  }

  userSubject = new Subject<User>();

  login(userInForm: User): Observable<any> {

    return this.http
      .post<{
        token: string,
        playerList: any,
        planetsInfo: any,
        userInfo: any
      }>(`${environment.springUrl}/auth/login`, JSON.stringify(userInForm), httpOptions)
      .pipe(

        map((response) => {

          const user: User = response.playerList.userInfo;
          const player: Player = { id: response.playerList.id, user: response.playerList.userInfo.email, level: response.playerList.level, type: response.playerList.nameType };
          const homePlanet: Planet = response.playerList.planetsInfo.filter((obj: Planet) => obj.first == true)[0];

          this.localService.saveStorageLogin(response.token, user, player, homePlanet);

          return userInForm;

        })
      )
      ;

  }

  register(user: User): Observable<any> {
    return this.http
      .post<{}>(`${environment.springUrl}/auth/register`, JSON.stringify(user), httpOptions)
      .pipe(
        map(() => {
          this.userSubject.next(user);
          return user;
        })
      );
  }

  isNewPlayer(id: number): Observable<any> {

    return this.http.get<any[]>(`${environment.springUrl}/api/player/${id}/hasType`);
    // .pipe( tap((response) => { console.log(response); }) );

  }

  getPlanetsOfUser(player: Player): Observable<any> {
    return this.http
      .post<{}>(`${environment.springUrl}/api/player/planets`, JSON.stringify(player), httpOptions);
      // .pipe(tap((response) => { console.log(response); }));

  }

  getAllTypesList(): Observable<any> {
    return this.http.get<any[]>(`${environment.springUrl}/api/type`);
    // .pipe( tap((response) => { console.log(response); }) );
  }

  updatePlayerType(idPlayer: number, idType: number): Observable<any> {
    return this.http.get<any[]>(`${environment.springUrl}/api/player/${idPlayer}/type/${idType}`);
    // .pipe( tap((response) => { console.log(response); }) );
  }

  getPlayerById(id: number): Observable<any> {
    return this.http.get<any[]>(`${environment.springUrl}/api/player/id/${id}`);
    // .pipe( tap((response) => { console.log(response); }) );
  }

  exploreNewWorld(player: Player): Observable<any> {
    return this.http
      .post<{}>(`${environment.springUrl}/api/planet/explore`, JSON.stringify(player), httpOptions);
      // .pipe(tap((response) => { console.log(response); }));
  }

}