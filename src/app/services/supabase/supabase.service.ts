import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor(private http: HttpClient) { }

  insertData(URI: string, token: string, data: any) {  

    let headersAux = {
      ...httpOptions,
      "Authorization": "Bearer " + token,
      "Prefer": "return=representation"
    };

    return this.http
    .post<{}>(`${environment.supabaseUrl}/rest/v1/${URI}`, JSON.stringify(data), headersAux)
    // .pipe( tap((response) => { console.log(response); }) );

  }

  getData(URI: string, token: string ): Observable<any[]> {

    let headersAux = { ...httpOptions, "Authorization": "Bearer " + token };

    return this.http.get<any[]>(`${environment.supabaseUrl}/rest/v1/${URI}`, headersAux);
  }

  
  // ? Supabase [GET] Methods

  getPlayerData(email: string) : Observable<any[]> {

    return this.getData(`player?user=eq.${email}&select=*`, environment.supabaseKey);
    // .pipe( tap((response) => { console.log(response); }) );

  }

  getUserData(email: string) : Observable<any[]> {

    return this.getData(`user?email=eq.${email}&select=*`, environment.supabaseKey);
    // .pipe( tap((response) => { console.log(response); }) );

  }

  getPlanetData(email: string) : Observable<any[]> {

    return this.getData(`planet?player=eq.${email}&select=*`, environment.supabaseKey);
    // .pipe( tap((response) => { console.log(response); }) );

  }
  
}
