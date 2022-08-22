import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  temp: any
  Authtoken : string =""
  constructor(private http:HttpClient) { 
    this.temp = localStorage.getItem("token");
    console.log("i am from the Admin sevice temp",this.temp);
    this.Authtoken = this.temp;
  }

  GetUser(userdata: any):Observable<any> {
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    return this.http.post('http://localhost:3080/api/user/getuser/'+ userdata.username ,userdata,{headers:header});
  }

  ReturnBook(userdata: any):Observable<any> {
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    return this.http.post('http://localhost:3080/api/user/returnbook/'+ userdata.username ,userdata,{ headers:header,responseType: 'text' as 'json'});
  }

  BorrowBook(userdata: any):Observable<any> {
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    return this.http.post('http://localhost:3080/api/user/newbook/'+ userdata.username ,userdata,{ headers:header,responseType: 'text' as 'json'});
  }

}
