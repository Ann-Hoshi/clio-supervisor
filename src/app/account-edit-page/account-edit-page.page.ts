import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account-edit-page',
  templateUrl: './account-edit-page.page.html',
  styleUrls: ['./account-edit-page.page.scss'],
})
export class AccountEditPagePage implements OnInit {

  datauser : any;
  username : any;
  accountInfo : any;
  accountInfo2 : any;

  name: any;
  firstName : any;
  middleName : any;
  lastName : any;
  contactNo : any;
  companyName : any;
  password : any;

  constructor(public alertController: AlertController, private storage: Storage, private router: Router, public _apiService : ApiService) { }

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
        
        this.companyName = this.accountInfo.companyName;
        
  
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
    });

    

  }
  

  accountEditPageSave(){
    
    let data = {
      username : this.datauser.username,
      firstName : this.firstName,
      middleName :this.middleName,
      lastName : this.lastName,
      companyName : this.companyName,
      password : this.password
    
    }
    
    this._apiService.editAccount(data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      

    },(error:any) => {
      console.log("ERROR ===", error);
    }
    )
    
   
  }

  accountEditPageCancel(){
    
    this.router.navigate(['/account']);
    
  }

  async presentAlert() {

     const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Update?',
      message: 'Save update?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.accountEditPageSave();
            this.router.navigate(['/account']);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
