import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BookhomeComponent } from '../bookhome/bookhome.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
   AddbookForm : FormGroup
  constructor(private dialogref:MatDialogRef<BookhomeComponent>, private formbuilder:FormBuilder) {
     this.AddbookForm = this.formbuilder.group({
      id: ['',[Validators.required,Validators.pattern('[0-9]*')]],
      bookname: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      bookauthor: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      count: ['',[Validators.required,Validators.pattern('[0-9]*')]]
     })
   }

  ngOnInit(): void {
  }

  close(){
    this.dialogref.close(null);
  }

  Addbook(){
    this.dialogref.close(this.AddbookForm.value);
  }


  get id(){
    return this.AddbookForm.get('id')
  }

  get bookname(){
    return this.AddbookForm.get('bookname')
  }
  get bookauthor(){
    return this.AddbookForm.get('bookauthor')
  }

  get count(){
    return this.AddbookForm.get('count')
  }
  
  

}
