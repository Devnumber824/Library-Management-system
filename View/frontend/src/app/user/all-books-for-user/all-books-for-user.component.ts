import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookserviceService } from 'src/app/book/bookservice.service';
import { bookdetails } from 'src/app/bookdetails';
import { LoginserviceService } from 'src/app/login/loginservice.service';
import { User } from 'src/app/user';
import { UserserviceService } from '../userservice.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-all-books-for-user',
  templateUrl: './all-books-for-user.component.html',
  styleUrls: ['./all-books-for-user.component.css']
})
export class AllBooksForUserComponent implements OnInit {
  AllBooks : Array<bookdetails> = []
  UserBooks: Array<bookdetails> = []
  userdata:any
  UserdataAct:any
  Userin:User
  Userbooksnumber : number
  helper = new JwtHelperService();
  constructor(private router:Router ,private service:BookserviceService,private service1:UserserviceService,private service2:LoginserviceService) {
    this.userdata = localStorage.getItem('token');
    // console.log("I am aaa",JSON.parse(this.userdata));
     this.UserdataAct = this.helper.decodeToken(this.userdata);
     this.filluser();
     this.getAllbooks();
   }

  ngOnInit(): void {
  }

  BorrowClicked(book:bookdetails){
    this.Userbooksnumber++;
   var value = { username:this.UserdataAct.username , bookid : book.id}
    this.service1.BorrowBook(value).subscribe( {next(value) {
    console.log("I am response from server",value);
},
error(err) {
    console.error(err.error);
    alert(err.error);
   //  temp = err.error
},
});
  var temp = this.AllBooks.indexOf(book)
    this.AllBooks.splice(temp,1)
  }

  getAllbooks(){
    this.service.getAll().subscribe(data=>{
      this.AllBooks = data
      console.log(this.AllBooks)
     })

     setTimeout(() => {
      for (let index1 = 0; index1 <this.Userin.bookids.length; index1++) {
        for (let index2 = 0; index2 < this.AllBooks.length; index2++) {
                     if(this.AllBooks[index2].id==this.Userin.bookids[index1]){
                        this.UserBooks[index1] = this.AllBooks[index2]
                        this.AllBooks.splice(index2,1);
                     }
        }
 }
 console.log(this.AllBooks)
     }, 200);

   }

   filluser(){
    var Authtok : any
    var Authtok1 : any
    this.service1.GetUser(this.UserdataAct).subscribe( {next(value) {
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

  logout(){
    this.service2.Logout().subscribe({next(value) {
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
