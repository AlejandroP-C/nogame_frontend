import { Injectable, Input } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '../interfaces/user';
import { SpringService } from '../services/spring.service';

@Injectable({
  providedIn: 'root'
})
export class IsplayerGuard implements CanActivate {

  @Input() user: User = JSON.parse(localStorage.getItem('user')!);

  constructor(private spring: SpringService) { }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let isNewPlayer = this.spring.isNewPlayer(this.user.email).subscribe((response) => { return response });

    if (isNewPlayer) { return false } else { return true; }

  }

}
