import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { SupabaseService } from './supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SpringService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private supabaseService: SupabaseService) {
    this.isLogged() ? this.logged.next(true) : this.logged.next(false);
  }

  userSubject = new Subject<User>();
  logged = new BehaviorSubject<boolean>(false);

  localstorageLogin(userTk: string, role: string, expires_in: string) {
    const now = new Date();
    const Token = {
      token: userTk,
      expiration: now.getTime() + parseInt(expires_in) * 1000,
    };
    localStorage.setItem('userTk', JSON.stringify(Token));
    localStorage.setItem('role', role);
    this.logged.next(true);
  }

  login(user: User): Observable<User> {
    return this.http
      .post<{
        access_token: string,
        role: string,
        expires_in: string;
      }>(`${environment.supabaseUrl}/auth/v1/token?grant_type=password`, JSON.stringify(user), httpOptions)
      .pipe(
        map((response) => {
          console.log(response);

          this.userSubject.next(user);
          this.localstorageLogin(
            response.access_token,
            response.role,
            response.expires_in,
          );
          return user;
        })
      );
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

  logout() {
    localStorage.removeItem('userTk');
    localStorage.removeItem('role');
    this.logged.next(false);
    setTimeout(() => { this.router.navigate(['/login']) }, 600);
  }

  isLogged() {
    const userTk = localStorage.getItem('userTk');
    const now = new Date();
    if (userTk) {
      const token: { token: string; expiration: number } = JSON.parse(userTk);
      if (token.expiration > now.getTime()) {
        return true;
      } else {
        localStorage.removeItem('userTk');
        localStorage.removeItem('role');
        localStorage.removeItem('expiration');
        this.router.navigate(['login']);
        return false;
      }
    } else { return false; }
  }

  isNewPlayer(user: User): Observable<boolean> {

    return this.supabaseService.getData(`player?user=eq.${user.email}&select=*`, environment.supabaseKey).
      pipe(
        map((response) => {

          if (response.length === 0) {

            return true;

          } else { return false; }

        })
      );

  }

}