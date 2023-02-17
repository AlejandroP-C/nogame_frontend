import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private supabaseService: SupabaseService, private router: Router) { }

  logged = new BehaviorSubject<boolean>(false);

  saveStorageLogin(userTk: string, expires_in: string, email: string) {

    // ? Create item:
    // ? let myObj = { name: 'Nixon', profession: 'Developer' };
    // ? localStorage.setItem(key, JSON.stringify(myObj));

    // ? Read item:
    // ? let item = JSON.parse(localStorage.getItem(key));

    const now = new Date();
    const Token = {
      token: userTk,
      expiration: now.getTime() + parseInt(expires_in) * 1000,
    };

    this.supabaseService.getUserData(email).subscribe((tableUser) => {
      delete tableUser[0].password;
      localStorage.setItem('user', JSON.stringify(tableUser[0]));
    });
    
    this.supabaseService.getPlayerData(email).subscribe((tablePlayer) => { 
      localStorage.setItem('player', JSON.stringify(tablePlayer[0])) 
    });

    this.supabaseService.getPlanetData(email).subscribe((tablePlanet) => { 
      localStorage.setItem('planet', JSON.stringify(tablePlanet[0])) 
    });
    
    localStorage.setItem('userTk', JSON.stringify(Token));

  }

  isLogged() {
    const userTk = localStorage.getItem('userTk');
    const now = new Date();

    if (userTk) {

      const token: { token: string; expiration: number } = JSON.parse(userTk);

      if (token.expiration > now.getTime()) { return true } else { localStorage.clear(); return false; }

    } else { return false; }

  }

  logout() { 
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
