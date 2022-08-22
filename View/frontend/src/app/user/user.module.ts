import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhomeComponent } from './userhome/userhome.component';
import { RouterModule } from '@angular/router';
import { AllBooksForUserComponent } from './all-books-for-user/all-books-for-user.component';


@NgModule({
  declarations: [
    UserhomeComponent,
    AllBooksForUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UserModule { }
