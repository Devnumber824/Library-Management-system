import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../loginservice.service';
import { Token } from '@angular/compiler';
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-loginauth',
  templateUrl: './loginauth.component.html',
  styleUrls: ['./loginauth.component.css']
})
export class LoginauthComponent implements OnInit {
   LoginForm : FormGroup
  constructor(private router : Router,private formbuider:FormBuilder,private service:LoginserviceService) { 
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
      const helper = new JwtHelperService();


     var flag = true
      this.service.LoginAdmin(this.LoginForm.value).subscribe( {next(value) {
        const decodedToken = helper.decodeToken(value);
         localStorage.setItem("token",value)
        console.log("I am response from server",value);
        console.log("decoded token----->",decodedToken)
    },
    error(err) {
        console.error(err.error);
        alert(err.error);
          flag = false
    },
   
  });
  setTimeout(() => {
    this.val(flag)
  }, 100);  
          
    }

    val(flag:boolean):void{
      if (flag) {
      this.router.navigate(['/', 'admin']);
    }else{
      alert("username or password is wrong")
    }

    }

}

