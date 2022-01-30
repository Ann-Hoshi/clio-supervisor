import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-grading-list',
  templateUrl: './grading-list.page.html',
  styleUrls: ['./grading-list.page.scss'],
})
export class GradingListPage implements OnInit {
  datauser : any;
  username : any;
  weeklyReportStudentListInfo : any;
  
  studentNumber :any;

  firstName : any;
  middleName : any;
  lastName : any;
  suffix : any;
  constructor(private storage: Storage, private router: Router, public _apiService : ApiService,private route: ActivatedRoute) {   this.route.params.subscribe((param:any) => {
    this.studentNumber = param.studentNumber;
  }) }

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
        
      
        
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
    });
  }

  

}
