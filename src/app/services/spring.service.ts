import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SpringService {

  constructor(private http: HttpClient) { }

  userSubject = new Subject<User>();

  private httpOptions = {
    headers: new HttpHeaders({
      "apiKey": environment.supabaseKey,
      "Content-Type": "application/json",
    }),
  };

  login(user: User) : Observable<any> {

    return this.http
    .post<{}>(`${environment.supabaseUrl}/auth/v1/token?grant_type=password`, JSON.stringify(user), this.httpOptions)
    .pipe(
      map((response) => {
        this.userSubject.next(user);
        return user;
      }),
      catchError((resp: HttpErrorResponse) =>
        throwError(() => alert("¡Error! Credenciales incorrectas."))
      )
    );
  }

}
