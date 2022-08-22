import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { bookdetails } from '../bookdetails';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  temp: any
  Authtoken : string =""
  constructor(private http:HttpClient) {
    this.temp = localStorage.getItem("token");
    console.log("i am from the Admin sevice temp",this.temp);
    this.Authtoken = this.temp;
   }

  getAll(): Observable<bookdetails[]>{
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    return this.http.get<bookdetails[]>('http://localhost:3080/api/getallbooks',{headers:header});
  }

  AddBook(Bookdata: any) {
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    return this.http.post('http://localhost:3080/api/newbook',Bookdata, { headers:header,responseType: 'text' as 'json'});
  }

  DeleteBook(id: string) {
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    const URl = "http://localhost:3080/api/deletebook/" + id
    return this.http.delete(URl,{headers:header,responseType: 'text' as 'json'});
  }

  UpdateBook(id: string,Bookdata:any) {
    var header = new HttpHeaders({
      'token': this.Authtoken
     });
    const URl = "http://localhost:3080/api/updatebook/" + id
    return this.http.put(URl,Bookdata,{headers:header, responseType: 'text' as 'json'});
  }

}
