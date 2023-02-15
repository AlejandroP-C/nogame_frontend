import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { LocalService } from './local.service';
import { SupabaseService } from './supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SpringService {

  constructor(
    private http: HttpClient,
    private supabaseService: SupabaseService,
    private localService: LocalService) {
  }

  userSubject = new Subject<User>();

  login(userInForm: User): Observable<User> {

    return this.http
      .post<{
        access_token: string,
        expires_in: string;
        email: string,
      }>(`${environment.supabaseUrl}/auth/v1/token?grant_type=password`, JSON.stringify(userInForm), httpOptions)
      .pipe(

        map((response) => {

          this.localService.saveStorageLogin(response.access_token, response.expires_in, userInForm.email);

          return userInForm;

        })
      )
    ;

  }

  register(user: User): Observable<any> {
    return this.http
      .post<{}>(`${environment.supabaseUrl}/auth/v1/signup`, JSON.stringify(user), httpOptions)
      .pipe(
        map(() => {
          this.userSubject.next(user);
          return user;
        })
      );
  }

  isNewPlayer(user: User): Observable<boolean> {

    return this.supabaseService.getData(`player?user=eq.${user.email}&select=*`, environment.supabaseKey).
      pipe(
        map((response) => {

          if (response.length === 0) {

            return true;

          } else { return false; }

        })
      )
    ;

  }

}