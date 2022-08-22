import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authtoken } from '../Authtoken';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }

  // getAll(): Observable<User[]>{
  //   return this.http.get<User[]>('http://localhost:3080/getallusers');
  // }

  LoginAdmin(Logindata: any):Observable<any> {
    return this.http.post('http://localhost:3080/api/login',Logindata);
  }

  LoginUser(Logindata: any):Observable<any> {
    return this.http.post('http://localhost:3080/api/user/login',Logindata);
  }

  LogoutUser():Observable<any> {
    localStorage.setItem('token',"");
    return this.http.post('http://localhost:3080/api/logout',null);
  }

  Logout():Observable<any> {
    localStorage.setItem('token',"");
    return this.http.post('http://localhost:3080/api/user/logout',null);
  }

  

}
