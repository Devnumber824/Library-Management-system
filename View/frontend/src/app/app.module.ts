import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserModule} from './user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AdminDeleteUserComponent } from './admin/admin-delete-user/admin-delete-user.component';
import { AdminAddUserComponent } from './admin/admin-add-user/admin-add-user.component';
import { BookModule } from './book/book.module';
import { BookhomeComponent } from './book/bookhome/bookhome.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { DeleteBookComponent } from './book/delete-book/delete-book.component';
import { UpdateBookComponent } from './book/update-book/update-book.component';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminUpdateUserComponent } from './admin/admin-update-user/admin-update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    UserModule,
    NgbModule,
     BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    BookModule,
    MatExpansionModule,
    AdminModule,
    ReactiveFormsModule,
    LoginModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatProgressSpinnerModule
  ],
  exports:[
//  UserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AdminAddUserComponent,AdminDeleteUserComponent,AddBookComponent,DeleteBookComponent,UpdateBookComponent,AdminUpdateUserComponent]
})
export class AppModule { }
