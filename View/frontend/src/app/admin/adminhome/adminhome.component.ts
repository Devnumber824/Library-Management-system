import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Authtoken } from 'src/app/Authtoken';
import { bookdetails } from 'src/app/bookdetails';
import { LoginserviceService } from 'src/app/login/loginservice.service';
import { User } from 'src/app/user';
import { AdminAddUserComponent } from '../admin-add-user/admin-add-user.component';
import { AdminDeleteUserComponent } from '../admin-delete-user/admin-delete-user.component';
import { AdminUpdateUserComponent } from '../admin-update-user/admin-update-user.component';
import { AdminserviceService } from '../adminservice.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BookserviceService } from 'src/app/book/bookservice.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  dropdownList :Array<any> = [];
  selectedItems :Array<any> = [];
  dropdownSettings:IDropdownSettings;
  helper = new JwtHelperService();
  loading:boolean = true
  /////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\/\/\/\/\/\/\/\/\/\/\/\/
  Users : User[] = []
  Books : Array<bookdetails> = []
  temp!:number
  Adduserdata :any
  id : string = ""
  Admindata :any
  RetData : any
  SearchInputUsername : string = ""
  SearchInputMin: Number = 0
  SearchInputMax : Number = 0
  columnsToDisplay: string[] = ['id', 'username', 'penalty','joiningDate'];
  dataSource = new MatTableDataSource<User>(this.Users);
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement !: User | null;
  constructor(private service2:BookserviceService,private router : Router,private dialog:MatDialog , private service:AdminserviceService,private service1:LoginserviceService) {
    this.GetData();
   this.Admindata = localStorage.getItem('token');
   console.log("I am aaa",this.Admindata);
    this.RetData = this.helper.decodeToken(this.Admindata);
   }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'id',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 50,
      allowSearchFilter: true
    };


  }

  onItemSelect(item: any) {
    console.log(item);
    console.log("this is selected items",this.selectedItems)
  }
  onSelectAll(items: any) {
    console.log(items);
  } 
  
  Visibleuserforid(user : User ):boolean {
    for (let index = 0; index < this.selectedItems.length; index++) {
      if (user.bookids.indexOf(this.selectedItems[index].id)!= -1){
        return true
      }
    }
    return false
  }

  VisibleuserMINMAX(user : User ):boolean {
      if (user.penalty >= this.SearchInputMin && user.penalty <= this.SearchInputMax){
        return true
      }
    return false
  }
   

  justfortest(){
    console.log(this.SearchInputUsername);
  }
  GetData(){
    console.log("i was executed")
    this.service.getAll().subscribe(data=>{
      this.Users = data
      this.loading=false
     })
     
     this.service2.getAll().subscribe(data=>{
      this.dropdownList = data
     })

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

  AddUser(){
    console.log("this is being passed to Adduser",this.Adduserdata);
    this.service.AddUser(this.Adduserdata).subscribe( {next(value) {
      console.log(value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      
  },
});
    setTimeout(() => {
      this.GetData();
    }, 2000);
    
  }
    

  AddUserClicked(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus = true;
    dialogconfig.width= "60%";
    dialogconfig.maxHeight = window.innerHeight + 'px' ;
  let dialogref=this.dialog.open(AdminAddUserComponent,dialogconfig);
     dialogref.afterClosed().subscribe((res)=>{
      console.log(res);
      this.Adduserdata = res
      if (res!=null)
             this.AddUser()
     })
  }


  DeleteUserClicked(user : User){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus = true;
    dialogconfig.width= "60%";
  let dialogref= this.dialog.open(AdminDeleteUserComponent,{

    width: '60%',
    data: user });

  dialogref.afterClosed().subscribe((res)=>{
    console.log(res);
    this.id = res
    if (res!=null)
           this.DeleteUser()
   })
  }

  DeleteUser(){
    console.log("this is being passed to Delete user",this.id);
    this.service.DeleteUser(this.id).subscribe( {next(value) {
      console.log(value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      
  },
});
    setTimeout(() => {
      this.GetData();
    }, 2000);
    
  }



  UpdateUserClicked(user : User){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus = true;
    dialogconfig.width= "60%";
  let dialogref=this.dialog.open(AdminUpdateUserComponent,{
    height: '70%',
    width: '60%',
    data: user });
     dialogref.afterClosed().subscribe((res)=>{
      console.log("i am admin home",res);
        this.UpdateUser(user.id , res)
     })

  }
  
  UpdateUser(id:string , user :any){
    console.log("this is being passed to Updateuser", user);
    this.service.UpdateUser(id,user).subscribe( {next(value) {
      console.log(value);
  },
  error(err) {
      console.error(err.error);
      alert(err.error);
      
  },
  });
    setTimeout(() => {
      this.GetData();
    }, 1000);
    
  }


}



  