import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';

@Component({
  selector: 'app-update-user-mod',
  templateUrl: './update-user-mod.component.html',
  styleUrls: ['./update-user-mod.component.css']
})
export class UpdateUserModComponent implements OnInit {

  hide = true;
 
  userData:any = {};

  currentEmail!:string;

  constructor(
    private authProxyS: AuthProxyService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser () {
    this.authProxyS.getUser()
    .subscribe((response:any) => {
      this.userData = response;
      this.currentEmail = response.email;
      this.userData.password = "";
    })
  }

  onImageUpload(event: any) {
    const reader = new FileReader()
    reader.onload = () => {
      this.userData.image = reader.result;
    }
    reader.readAsDataURL(event.target.files[0])
  }

  onFormSubmit() {
    this.authProxyS.updateUser(this.userData)
    .subscribe((response:any) => {
      if(response) {
        if(response.email !== this.currentEmail){
          this.snackBar.open('Link Has Been Sent On Your Email, You Can Click On It And Email Will Be Verified!', 'Ok!')
          this.router.navigate(['login'])
          localStorage.removeItem('jwt')
          this.dialog.closeAll();
        }else {
          this.snackBar.open('Account Has Been Updated!', 'Ok!')
          this.dialog.closeAll();
        }
      }
    }, (error) => {
      this.snackBar.open(error.error.message, 'Ok!')
    })
  }
}
