import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardReverseService } from './guards/auth-guard-reverse.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginPgComponent } from './views/login-pg/login-pg.component';
import { ProfilePgComponent } from './views/profile-pg/profile-pg.component';
import { RegisterPgComponent } from './views/register-pg/register-pg.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

const routes: Routes = [
  {path: '', canActivate: [AuthGuardReverseService], component: RegisterPgComponent},
  {path: 'login', canActivate: [AuthGuardReverseService], component: LoginPgComponent},
  {path: 'profile', canActivate: [AuthGuardService], component: ProfilePgComponent},
  {path: 'resetpassword/:userId/:resetToken', canActivate: [AuthGuardReverseService], component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
