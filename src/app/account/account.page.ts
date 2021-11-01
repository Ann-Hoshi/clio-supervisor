import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  datauser : any;
  username : any;
  accountInfo : any;


  firstName : any;
  middleName : any;
  lastName : any;
  suffix : any;
  contactNo : any;
  companyName : any;
  src : any;
 

  constructor(private storage: Storage, private router: Router, public _apiService : ApiService) { }

  ngOnInit() {

    this.storage.create();
    this.storage.get('session_storage').then((res)=>{
      this.datauser = res;

      let data = {
        username : this.datauser.username
        
      }

      this._apiService.account(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.accountInfo = res.result;
        
        this.firstName = this.accountInfo.firstName;
        this.lastName = this.accountInfo.lastName;
        this.middleName = this.accountInfo.middleName;
        this.suffix = this.accountInfo.suffix;
        
        this.companyName = this.accountInfo.companyName;
        this.contactNo = this.accountInfo.contactNo;
        this.src = `http://www.clio-rms.com/backend/uploads/${this.accountInfo.supervisorImage}`;
        
        
      
  
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

      this._apiService.account(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.accountInfo = res.result;
        
        this.firstName = this.accountInfo.firstName;
        this.lastName = this.accountInfo.lastName;
        this.middleName = this.accountInfo.middleName;
        this.suffix = this.accountInfo.suffix;
        this.companyName = this.accountInfo.companyName;
        this.contactNo = this.accountInfo.contactNo;

        this.src = `http://www.clio-rms.com/backend/uploads/${this.accountInfo.supervisorImage}`;
        
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
    });
  }

  account(){
    this.router.navigate(['/account-edit-page']);
  }

}
