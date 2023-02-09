import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor(private http: HttpClient) { }

  insertData(URI: string, token: string, data: string) {  

    let headersAux = {
      ...httpOptions,
      "Authorization": "Bearer " + token,
      "Prefer": "return=representation"
    };

    return this.http
    .post<{}>(`${environment.supabaseUrl}/rest/v1/${URI}`, JSON.stringify(data), headersAux)
    .pipe( tap((response) => { console.log(response); }) );

  }

  getData(URI: string, token: string ): Observable<any[]> {

    let headersAux = { ...httpOptions, "Authorization": "Bearer " + token };

    return this.http.get<any[]>(`${environment.supabaseUrl}/rest/v1/${URI}`, headersAux);
  }
  
}
