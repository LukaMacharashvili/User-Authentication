import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { RegisterPgComponent } from './views/register-pg/register-pg.component';
import { LoginPgComponent } from './views/login-pg/login-pg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePgComponent } from './views/profile-pg/profile-pg.component';
import { UpdateUserModComponent } from './views/update-user-mod/update-user-mod.component';
import { DeleteUserModComponent } from './views/delete-user-mod/delete-user-mod.component';
import { ForgotPasswordModComponent } from './views/forgot-password-mod/forgot-password-mod.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPgComponent,
    LoginPgComponent,
    ProfilePgComponent,
    UpdateUserModComponent,
    DeleteUserModComponent,
    ForgotPasswordModComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
