import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-student-weekly-report',
  templateUrl: './student-weekly-report.page.html',
  styleUrls: ['./student-weekly-report.page.scss'],
})
export class StudentWeeklyReportPage implements OnInit {
  datauser : any;
  username : any;
  weeklyReportInfo : any;
  weeklyReportID : any;

  firstName : any;
  middleName : any;
  lastName : any;
  suffix : any;

  date : any;
  timeIn : any;
  timeOut : any;
  tasks : any;
  learning : any;

  constructor(private storage: Storage, private router: Router, public _apiService : ApiService,private route: ActivatedRoute) { 
    this.route.params.subscribe((param:any) => {
      this.weeklyReportID = param.weeklyReportID;
    })
  }

  ngOnInit() {
    

      let data = {
        weeklyReportID : this.weeklyReportID
        
      }

      this._apiService.weeklyReport(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.weeklyReportInfo = res.result;
        
        this.firstName = this.weeklyReportInfo.firstName;
        this.lastName = this.weeklyReportInfo.lastName;
        this.middleName = this.weeklyReportInfo.middleName;
        this.suffix = this.weeklyReportInfo.suffix;
        
        this.date = this.weeklyReportInfo.date;
        this.timeIn = this.weeklyReportInfo.timeIn;
        this.timeOut = this.weeklyReportInfo.timeOut;
        this.tasks = this.weeklyReportInfo.tasks;
        this.learning = this.weeklyReportInfo.learning;
        
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
   
  }

  ionViewWillEnter(){
    

      let data = {
        weeklyReportID : this.weeklyReportID
        
      }

      this._apiService.weeklyReport(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.weeklyReportInfo = res.result;
        
        this.firstName = this.weeklyReportInfo.firstName;
        this.lastName = this.weeklyReportInfo.lastName;
        this.middleName = this.weeklyReportInfo.middleName;
        this.suffix = this.weeklyReportInfo.suffix;
        
        this.date = this.weeklyReportInfo.date;
        this.timeIn = this.weeklyReportInfo.timeIn;
        this.timeOut = this.weeklyReportInfo.timeOut;
        this.tasks = this.weeklyReportInfo.tasks;
        this.learning = this.weeklyReportInfo.learning;
        
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
    
  }

  viewDTR(){
    
  }

  notValid(){
    this.router.navigate(['/list-of-students-weekly-report']);
  }

  confirm(){
    
  }

}
