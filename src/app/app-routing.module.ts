import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { UserProfileComponent } from './components/authentication/user-profile/user-profile.component';
import { BattlesComponent } from './components/battles/battles.component';
import { PlanetSelectComponent } from './components/cards/planet-select/planet-select.component';
import { PlayerTypeComponent } from './components/cards/player-type/player-type.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ResourcesListComponent } from './components/resources/resources-list/resources-list.component';
import { IsplayerGuard } from './guards/isplayer.guard';
import { LoggedGuard } from './guards/logged.guard';
import { NoLoggedGuard } from './guards/no-logged.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedGuard] },
  { path: 'type', component: PlayerTypeComponent, canActivate: [NoLoggedGuard, IsplayerGuard] },
  { path: 'main', component: MainPageComponent, canActivate: [NoLoggedGuard] },
  { path: 'planet-select', component: PlanetSelectComponent, canActivate: [NoLoggedGuard] },

  { path: 'resources/:id', component: ResourcesListComponent, canActivate: [NoLoggedGuard] },

  { path: 'account', component: UserProfileComponent, canActivate: [NoLoggedGuard] },

  { path: 'battles', component: BattlesComponent, canActivate: [NoLoggedGuard] },

  { path: '', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
