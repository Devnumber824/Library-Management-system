import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginauthuserComponent } from '../loginauthuser/loginauthuser.component';
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {
  Addform : FormGroup;
  constructor(private formbuider:FormBuilder,private dialogref:MatDialogRef<LoginauthuserComponent>) { 
    this.Addform = this.formbuider.group({
      username : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      password : ['',[Validators.required,Validators.minLength(8)]],
      firstname : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      lastname :['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email : new FormControl(),
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
