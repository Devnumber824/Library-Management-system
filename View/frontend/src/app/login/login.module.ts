import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginauthComponent } from './loginauth/loginauth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginauthuserComponent } from './loginauthuser/loginauthuser.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginauthComponent,
    LoginauthuserComponent,
    RegisteruserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule
  ]
})
export class LoginModule { }
