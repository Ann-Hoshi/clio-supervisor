import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( public http: HttpClient) { }

  logIn(data){
    return this.http.post('http://clio-rms.com/backend/login.php',data)
  }

  account(data){
    return this.http.post('http://clio-rms.com/backend/account.php',data)
  }
  editAccount(data){
    return this.http.post('http://clio-rms.com/backend/editAccount.php',data)
  }
  weeklyReportStudentList(data){
    return this.http.post('http://clio-rms.com/backend/weeklyReportStudentList.php',data)
  }
  weeklyReport(data){
    return this.http.post('http://clio-rms.com/backend/weeklyReport.php',data)
  }
  evaluation(data){
    return this.http.post('http://clio-rms.com/backend/evaluation.php',data)
  }
  evaluationRemarks(data){
    return this.http.post('http://clio-rms.com/backend/evaluationRemarks.php',data)
  }
  certificate(data){
    return this.http.post('http://clio-rms.com/backend/certificate.php',data)
  }
  concerns(data){
    return this.http.post('http://clio-rms.com/backend/concerns.php',data)
  }
  addConcern(data){
    return this.http.post('http://clio-rms.com/backend/addConcern.php',data)
  }
  getWeeklyReport(data){
    return this.http.post('http://clio-rms.com/backend/getWeeklyReport.php',data)
  }
  confirmWeeklyReport(data){
    return this.http.post('http://clio-rms.com/backend/confirmWeeklyReport.php',data)
  }
  gradingSystem(data){
    return this.http.post('http://clio-rms.com/backendstudent/gradingSystem.php',data)
  }
  getFiles(data){
    return this.http.post('http://clio-rms.com/backend/getFiles.php',data)
  }
  getReportFiles(data){
    return this.http.post('http://clio-rms.com/backendstudent/getReportFiles.php',data)
  }
  getFile(data){
    return this.http.post('http://clio-rms.com/backendstudent/getFile.php',data)
  }
  getReportFile(data){
    return this.http.post('http://clio-rms.com/backendstudent/getReportFile.php',data)
  }
  uploadForm(data){
    return this.http.post('http://clio-rms.com/backendstudent/uploadForm.php',data)
  }
  uploadReportForm(data){
    return this.http.post('http://clio-rms.com/backendstudent/uploadReportForm.php',data)
  }
}
