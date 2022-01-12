import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-week-pdf',
  templateUrl: './list-week-pdf.page.html',
  styleUrls: ['./list-week-pdf.page.scss'],
})
export class ListWeekPdfPage implements OnInit {
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
        

  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
    });
  }
  ionViewWillEnter(){this.ngOnInit()}

}
