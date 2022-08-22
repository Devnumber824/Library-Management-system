import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { bookdetails } from 'src/app/bookdetails';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { BookserviceService } from '../bookservice.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginserviceService } from 'src/app/login/loginservice.service';


@Component({
  selector: 'app-bookhome',
  templateUrl: './bookhome.component.html',
  styleUrls: ['./bookhome.component.css']
})
export class BookhomeComponent implements OnInit {
  Books : Array<bookdetails> = []
  AddBook : bookdetails
  temp : any
  tokentemp : any
  tokenact : any 
  helper = new JwtHelperService();
  constructor(private router:Router, private dialog:MatDialog,private service:BookserviceService,private service1:LoginserviceService) {
     this.getAllbooks()
      this.tokentemp = localStorage.getItem('token');
      this.tokenact=this.helper.decodeToken(this.tokentemp);
   }

   getAllbooks(){
    this.service.getAll().subscribe(data=>{
      this.Books = data
     })
   }

   
  AddBookClicked(){
 const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus = true;
    dialogconfig.width= "60%";
  let dialogref= this.dialog.open(AddBookComponent,dialogconfig);
     dialogref.afterClosed().subscribe((res)=>{
      console.log(res);
      this.AddBook = res
      if (res!=null)
             this.Addbook()
     })
  }

   Addbook(){
    console.log("this is being passed to Adduser",this.AddBook);
    this.service.AddBook(this.AddBook).subscribe( {next(value) {
      console.log(value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      
  },
});
    setTimeout(() => {
      this.getAllbooks();
    }, 1000);
   }

  DeleteBookClicked(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus = true;
    dialogconfig.width= "60%";
  let dialogref= this.dialog.open(DeleteBookComponent,dialogconfig);
     dialogref.afterClosed().subscribe((res)=>{
      console.log(res);
      this.temp = res
      if (res!=null)
             this.DeleteBook(this.temp.id)
     })
  }

  DeleteBook(id: string){
    console.log("this is being passed to Adduser",this.AddBook);
    this.service.DeleteBook(id).subscribe( {next(value) {
      console.log(value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      
  },
});
    setTimeout(() => {
      this.getAllbooks();
    }, 1000);
   }




  UpdateBookClicked(bookdata:bookdetails){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus = true;
    dialogconfig.width= "60%";
    let dialogref=this.dialog.open(UpdateBookComponent,{
      height: '70%',
      width: '60%',
      data: bookdata });
       dialogref.afterClosed().subscribe((res)=>{
        console.log("i am admin home",res);
          this.UpdateBook(res.id , res)
       })
  }

  UpdateBook(id: string,Book : any){
    console.log("this is being passed to Adduser", Book);
    this.service.UpdateBook(id,Book).subscribe( {next(value) {
      console.log(value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      
  },
});
    setTimeout(() => {
      this.getAllbooks();
    }, 1000);
   }

  ngOnInit(): void {
  }

  logout(){
    this.service1.LogoutUser().subscribe({next(value) {
      console.log(value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      
  },
});
    this.router.navigate(['/']);
   
  }

}
