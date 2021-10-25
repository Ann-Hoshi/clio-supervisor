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
  weeklyReportStudentList(data){
    return this.http.post('http://localhost/CLIO/backend/weeklyReportStudentList.php',data)
  }
  weeklyReport(data){
    return this.http.post('http://localhost/CLIO/backend/weeklyReport.php',data)
  }
  evaluation(data){
    return this.http.post('http://localhost/CLIO/backend/evaluation.php',data)
  }
  evaluationRemarks(data){
    return this.http.post('http://localhost/CLIO/backend/evaluationRemarks.php',data)
  }
  concerns(data){
    return this.http.post('http://localhost/CLIO/backend/concerns.php',data)
  }
  addConcern(data){
    return this.http.post('http://localhost/CLIO/backend/addConcern.php',data)
  }
}
