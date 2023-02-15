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

//? Angular Vanilla
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//? PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';

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
    LogoutButtonComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
