import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/admin/adminservice.service';
import { BookserviceService } from 'src/app/book/bookservice.service';
import { bookdetails } from 'src/app/bookdetails';
import { LoginserviceService } from 'src/app/login/loginservice.service';
import { User } from 'src/app/user';
import { UserserviceService } from '../userservice.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
    UserBooks: Array<bookdetails> = []
    AllBooks: Array<bookdetails> = []
    Userin:User
    userdata:any
    UserdataAct:any
    Userbooksnumber : number
   helper = new JwtHelperService();

  constructor(private service1:LoginserviceService,private router:Router,private service:UserserviceService,private service2:BookserviceService) {
    this.userdata = localStorage.getItem('token');
    this.UserdataAct = this.helper.decodeToken(this.userdata);
    this.filluser();
    setTimeout(() => {
      this.getAllbooks();
    }, 500);
   }

  ngOnInit(): void {
  }

  getAllbooks(){
    this.service2.getAll().subscribe(data=>{
      this.AllBooks = data
      console.log(this.AllBooks)
     })
      
     setTimeout(() => {
      for (let index1 = 0; index1 <this.Userin.bookids.length; index1++) {
        for (let index2 = 0; index2 < this.AllBooks.length; index2++) {
                     if(this.AllBooks[index2].id==this.Userin.bookids[index1]){
                        this.UserBooks[index1] = this.AllBooks[index2]
                     }
        }
 }
 console.log(this.AllBooks)
     }, 200);
   }


  filluser(){
    var Authtok : any
    var Authtok1 : any
    this.service.GetUser(this.UserdataAct).subscribe( {next(value) {
       Authtok = value
     console.log("I am response from server",value);
 },
 error(err) {
     console.error(err.error);
     alert(err.error);
    //  temp = err.error
 },

});

setTimeout(() => {
  console.log("i am auth",Authtok)
  this.Userin = Authtok
  this.Userbooksnumber = this.Userin.bookids.length
  console.log(this.Userin)
}, 100);
   


  }

 

  ReturnClicked(book :bookdetails){
    console.log(book.id);
    var value = { username:this.UserdataAct.username , bookid : book.id}
    this.service.ReturnBook(value).subscribe( {next(value) {
    console.log("I am response from server",value);
},
error(err) {
    console.error(err.error);
    alert(err.error);
   //  temp = err.error
},
});
   this.Userbooksnumber--;
  var temp = this.UserBooks.indexOf(book)
    this.UserBooks.splice(temp,1)

  }

  logout(){
    this.service1.Logout().subscribe({next(value) {
      console.log(value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      
  },
});
  
   var Authtok = {"username":"","authority":"","activestatus":""}
   localStorage.setItem('token',JSON.stringify(Authtok));

    this.router.navigate(['/']);
   
  }

}
