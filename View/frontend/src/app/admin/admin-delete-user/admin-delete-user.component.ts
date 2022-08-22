import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { AdminhomeComponent } from '../adminhome/adminhome.component';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-delete-user',
  templateUrl: './admin-delete-user.component.html',
  styleUrls: ['./admin-delete-user.component.css']
})
export class AdminDeleteUserComponent implements OnInit {
  DeleteForm : FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogref:MatDialogRef<AdminhomeComponent>,private formbuider:FormBuilder) { 
    this.DeleteForm = this.formbuider.group({
      id : ['',Validators.required],
     });
     console.log(data);
     
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fillformdata();
   }, 500);
  } 
   


  close(){
    this.dialogref.close(null)
  }

  DeleteReq(){
    let temp : string
    console.log("Delete req is called")
    temp = this.DeleteForm.value.id
    this.dialogref.close(temp);
  }
    
  fillformdata(){
    this.DeleteForm.patchValue({
    id : this.data.id,
    });
 }

}
