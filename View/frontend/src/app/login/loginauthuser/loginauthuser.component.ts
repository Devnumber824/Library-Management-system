import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../loginservice.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisteruserComponent } from '../registeruser/registeruser.component';
import { User } from 'src/app/user';
import { AdminserviceService } from 'src/app/admin/adminservice.service';

@Component({
  selector: 'app-loginauthuser',
  templateUrl: './loginauthuser.component.html',
  styleUrls: ['./loginauthuser.component.css']
})
export class LoginauthuserComponent implements OnInit {
  Authval: number = 3
  LoginForm : FormGroup
  AuthToken : any
  invalidlog : boolean = false
  Adduserdata : User

  constructor(private dialog:MatDialog ,private router : Router,private formbuider:FormBuilder,private service:LoginserviceService,private service1:AdminserviceService) { 
    this.LoginForm = this.formbuider.group({
      username : ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
      password : ['',[Validators.required,Validators.minLength(8)]],
     });
  }

  ngOnInit(): void {
  }

  get password(){
    return this.LoginForm.get('password')
  }
  
  get username(){
    return this.LoginForm.get('username')
  }

  Auth():void{
    var flag = true
    this.service.LoginUser(this.LoginForm.value).subscribe( {next(value) {
      localStorage.setItem("token",value)
      console.log("I am response from server",value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      flag=false  
  },
 
});
setTimeout(() => {
   this.val(flag)
}, 100);  
        
  }

  val(flag:boolean):void{
    if (flag) {
      this.router.navigate(['/', 'user']);
    }else{
      alert("username or password is wrong")
    }
  }

  AddUser(){
    console.log("this is being passed to Adduser",this.Adduserdata);
    this.service1.AddUser(this.Adduserdata).subscribe( {next(value) {
      console.log(value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      
  },
});
   
    
  }
    

  AddUserClicked(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus = true;
    dialogconfig.width= "60%";
  let dialogref=this.dialog.open(RegisteruserComponent,dialogconfig);
     dialogref.afterClosed().subscribe((res)=>{
      console.log(res);
      this.Adduserdata = res
      if (res!=null)
             this.AddUser()
     })
  }

 



}
