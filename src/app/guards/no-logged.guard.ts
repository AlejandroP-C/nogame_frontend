import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { LocalService } from '../services/local.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedGuard implements CanActivate {

  constructor(private localService: LocalService) { }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let isLoggedIn = this.localService.isLogged();

    if (isLoggedIn) { return true } else { return false; }


  }

}
