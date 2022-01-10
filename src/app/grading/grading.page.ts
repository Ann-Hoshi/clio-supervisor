import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.page.html',
  styleUrls: ['./grading.page.scss'],
})
export class GradingPage implements OnInit {


  gradingSystem;
  criteria;

  datauser;
  gradingSystemInfo;

  constructor(private storage: Storage, private router: Router, public _apiService : ApiService) { }

  ngOnInit() {
    this.storage.create();
    this.storage.get('session_storage').then((res)=>{
      this.datauser = res;

      let data = {
        username : this.datauser.username
      }

      this._apiService.gradingSystem(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
         this.gradingSystemInfo = res.result;

        
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
    });
  }
  }


