import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';
import { DeleteUserModComponent } from '../delete-user-mod/delete-user-mod.component';
import { UpdateUserModComponent } from '../update-user-mod/update-user-mod.component';

@Component({
  selector: 'app-profile-pg',
  templateUrl: './profile-pg.component.html',
  styleUrls: ['./profile-pg.component.css']
})
export class ProfilePgComponent implements OnInit {

  userData:any = {};

  constructor(
    private authProxyS: AuthProxyService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser () {
    this.authProxyS.getUser()
    .subscribe((response) => {
      this.userData = response;
    })
  }

  openDeleteUserModuleBtnClick () {
    this.dialog.open(DeleteUserModComponent)
  }

  openUpdateUserFormBtnClick () {
    this.dialog.open(UpdateUserModComponent)
  }

  logOut () {
    localStorage.removeItem('jwt')
    this.router.navigate(['login']);
  }

}
