import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookhomeComponent } from './bookhome/bookhome.component';
import { RouterModule } from '@angular/router';  
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    BookhomeComponent,
    AddBookComponent,
    UpdateBookComponent,
    DeleteBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class BookModule { }
