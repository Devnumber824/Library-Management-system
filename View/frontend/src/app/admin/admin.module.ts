import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { RouterModule } from '@angular/router';  
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component'
import {MatDialogModule} from '@angular/material/dialog';
import { AdminDeleteUserComponent } from './admin-delete-user/admin-delete-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner"


@NgModule({
  declarations: [
    AdminAddUserComponent,
    AdminhomeComponent,
    AdminDeleteUserComponent,
    AdminUpdateUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    NgbModule,
    MatExpansionModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatProgressSpinnerModule
  ]
})
export class AdminModule { }
