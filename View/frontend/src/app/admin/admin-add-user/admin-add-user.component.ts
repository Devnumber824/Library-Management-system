import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminhomeComponent } from '../adminhome/adminhome.component';
import { AdminserviceService } from '../adminservice.service';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {
  Addform : FormGroup;
  constructor(private dialogref:MatDialogRef<AdminhomeComponent>, private formbuider:FormBuilder) {
     
   this.Addform = this.formbuider.group({
    username : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    password : ['',[Validators.required,Validators.minLength(8)]],
    firstname : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    lastname :['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email : ['',[Validators.required,Validators.email]],
    contactnumber: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
    
   });
   }
    
  ngOnInit(): void {
  }
  close(){
    this.dialogref.close(null);
 }

 datasubmit(){
  
  this.dialogref.close(this.Addform.value);
  
 }

 get firstname(){
  return this.Addform.get('firstname')
}

get password(){
  return this.Addform.get('password')
}

get username(){
  return this.Addform.get('username')
}

get lastname(){
  return this.Addform.get('lastname')
}

get email(){
  return this.Addform.get('email')
}

get contactnumber(){
  return this.Addform.get('contactnumber')
}



}
