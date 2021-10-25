import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-of-students',
  templateUrl: './list-of-students.page.html',
  styleUrls: ['./list-of-students.page.scss'],
})
export class ListOfStudentsPage implements OnInit {
  datauser : any;
  username : any;
  weeklyReportStudentListInfo : any;


  firstName : any;
  middleName : any;
  lastName : any;
  suffix : any;

  constructor(private storage: Storage, private router: Router, public _apiService : ApiService) { }

  ngOnInit() {
    this.storage.create();
    this.storage.get('session_storage').then((res)=>{
      this.datauser = res;

      let data = {
        username : this.datauser.username
        
      }

      this._apiService.weeklyReportStudentList(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.weeklyReportStudentListInfo = res.result;
        
        this.firstName = this.weeklyReportStudentListInfo.firstName;
        this.lastName = this.weeklyReportStudentListInfo.lastName;
        this.middleName = this.weeklyReportStudentListInfo.middleName;
        this.suffix = this.weeklyReportStudentListInfo.suffix;
        
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
    });
  }

  ionViewWillEnter(){
    this.storage.create();
    this.storage.get('session_storage').then((res)=>{
      this.datauser = res;

      let data = {
        username : this.datauser.username
        
      }

      this._apiService.weeklyReportStudentList(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.weeklyReportStudentListInfo = res.result;
        
        this.firstName = this.weeklyReportStudentListInfo.firstName;
        this.lastName = this.weeklyReportStudentListInfo.lastName;
        this.middleName = this.weeklyReportStudentListInfo.middleName;
        this.suffix = this.weeklyReportStudentListInfo.suffix;
        
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
    });
  }

  student(){
    this.router.navigate(['/list-of-students-weekly-report']);
  }
}
