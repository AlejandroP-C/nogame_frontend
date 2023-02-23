import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

//? Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { PlayerTypeComponent } from './components/cards/player-type/player-type.component';
import { PanelMenuComponent } from './components/shared/panel-menu/panel-menu.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserProfileComponent } from './components/authentication/user-profile/user-profile.component';
import { LogoutButtonComponent } from './components/shared/logout-button/logout-button.component';
import { ResourcesListComponent } from './components/resources/resources-list/resources-list.component';
import { ResourcesItemComponent } from './components/resources/resources-item/resources-item.component';
import { PlanetSelectComponent } from './components/cards/planet-select/planet-select.component';

//? Angular Vanilla
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//? PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';

// ? JwtHelperService
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { httpInterceptorProviders } from './_helpers/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PlayerTypeComponent,
    PanelMenuComponent,
    PanelMenuComponent,
    MainPageComponent,
    UserProfileComponent,
    LogoutButtonComponent,
    ResourcesListComponent,
    ResourcesItemComponent,
    PlanetSelectComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    PanelMenuModule,
    ReactiveFormsModule,
    TableModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
