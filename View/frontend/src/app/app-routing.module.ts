import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { BookhomeComponent } from './book/bookhome/bookhome.component';
import { LoginauthComponent } from './login/loginauth/loginauth.component';
import { LoginauthuserComponent } from './login/loginauthuser/loginauthuser.component';
import { RegisteruserComponent } from './login/registeruser/registeruser.component';
import { AllBooksForUserComponent } from './user/all-books-for-user/all-books-for-user.component';
import { UserhomeComponent } from './user/userhome/userhome.component';


const routes: Routes = [
  {path:'',component:LoginauthuserComponent},
  {path:'adminlogin',component:LoginauthComponent},
  {path:'reguser',component:RegisteruserComponent},
  {path:'user',component:UserhomeComponent},
  {path:'admin', component:AdminhomeComponent},
  {path:'admin/books',component:BookhomeComponent},
  {path:'user/books',component:AllBooksForUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
