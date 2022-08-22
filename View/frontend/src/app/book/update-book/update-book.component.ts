import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookhomeComponent } from '../bookhome/bookhome.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
   UpdateBookForm : FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogref:MatDialogRef<BookhomeComponent>,private formbuilder:FormBuilder) {
    this.UpdateBookForm = this.formbuilder.group({
      id: ['',[Validators.required,Validators.pattern('[0-9]*')]],
      bookname: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      bookauthor: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      count: ['',[Validators.required,Validators.pattern('[0-9]*')]]
     })
   }

  ngOnInit(): void {
    this.FillValues();
  }

  FillValues(){
    this.UpdateBookForm.patchValue({
      id: this.data.id,
      bookname : this.data.bookname,
      bookauthor : this.data.bookauthor,
      count : this.data.count
      
     });
  }

  close(){
    this.dialogref.close(null)
  }

  Update(){
    this.dialogref.close(this.UpdateBookForm.value)
  }

  get id(){
    return this.UpdateBookForm.get('id')
  }

  get bookname(){
    return this.UpdateBookForm.get('bookname')
  }
  get bookauthor(){
    return this.UpdateBookForm.get('bookauthor')
  }

  get count(){
    return this.UpdateBookForm.get('count')
  }

}
