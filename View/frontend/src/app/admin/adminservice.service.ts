import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  temp: any
  Authtoken : string =""
  constructor(private http:HttpClient) { 
    this.temp = localStorage.getItem("token");
    this.Authtoken = this.temp;

  }

  



  getAll(): Observable<User[]>{
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
  
    return this.http.get<User[]>('http://localhost:3080/api/getallusers',{headers:header});
  }

  AddUser(Userdata: any) {
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    return this.http.post('http://localhost:3080/api/newuser',Userdata, { headers:header, responseType: 'text' as 'json'});
  }

  DeleteUser(id: string) {
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    const URl = "http://localhost:3080/api/Deleteuser/" + id
    return this.http.delete(URl,{ headers:header,responseType: 'text' as 'json'});
  }

  UpdateUser(id: string,Userdata:any) {
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    const URl = "http://localhost:3080/api/Updateuser/" + id
    return this.http.put(URl,Userdata,{ headers:header,responseType: 'text' as 'json'});
  }




}
