import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminhomeComponent } from '../adminhome/adminhome.component';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrls: ['./admin-update-user.component.css']
})
export class AdminUpdateUserComponent implements OnInit,AfterViewInit {
   

   Updateform : FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogref : MatDialogRef<AdminhomeComponent>,private formbuider:FormBuilder) { 
     
   this.Updateform = this.formbuider.group({
    firstname : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    lastname :['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email : ['',[Validators.required,Validators.email]],
    contactnumber: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
    penalty : ['',[Validators.required,Validators.pattern('[0-9 ]*')]]
   });
    
    
  }

  ngOnInit(): void {
    console.log("I am Update home component baby",this.data)
    setTimeout(() => {
       this.fillformdata();
    }, 500);
     
  }

  fillformdata(){
     this.Updateform.patchValue({
      firstname : this.data.firstname,
      lastname : this.data.lastname,
      email : this.data.email,
      contactnumber : this.data.contactnumber,
      penalty: this.data.penalty
     });
  }

  ngAfterViewInit(): void{
    
  }

  close(){
    this.dialogref.close(null);
  }

  execute(){
    console.log(this.Updateform.value);
    this.dialogref.close(this.Updateform.value);
    
  }

  get firstname(){
    return this.Updateform.get('firstname')
  }

  get lastname(){
    return this.Updateform.get('lastname')
  }

  get email(){
    return this.Updateform.get('email')
  }

  get contactnumber(){
    return this.Updateform.get('contactnumber')
  }

  get penalty(){
    return this.Updateform.get('penalty')
  }



}
