import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( public http: HttpClient) { }

  logIn(data){
    return this.http.post('http://localhost/CLIO/backend/login.php',data)
  }

  account(data){
    return this.http.post('http://localhost/CLIO/backend/account.php',data)
  }
  editAccount(data){
    return this.http.post('http://localhost/CLIO/backend/editAccount.php',data)
  }
}
