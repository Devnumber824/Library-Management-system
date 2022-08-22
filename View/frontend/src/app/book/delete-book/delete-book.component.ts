import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BookhomeComponent } from '../bookhome/bookhome.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
   
  DeleteForm:FormGroup
  constructor(private dialogref:MatDialogRef<BookhomeComponent>, private formbuilder:FormBuilder) {
    this.DeleteForm = this.formbuilder.group({
      id: ['',[Validators.required,Validators.pattern('[0-9]*')]]
     })
   }

  ngOnInit(): void {
  }

  close(){
    this.dialogref.close(null)
  }

  DeleteBook(){
    this.dialogref.close(this.DeleteForm.value)
  }
   
  get id(){
    return this.DeleteForm.get('id')
  }
}
