import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-concerns',
  templateUrl: './concerns.page.html',
  styleUrls: ['./concerns.page.scss'],
})
export class ConcernsPage implements OnInit {
  datauser : any;
  username : any;
  concernsInfo : any;


  firstName : any;
  middleName : any;
  lastName : any;
  suffix : any;
  contactNo : any;
  companyName : any;
  subject;
  concern;
  dateTime;
  evaluationInfo;
  supervisorID;
  toUser;
  isEnabled;
  studentNumber;

  constructor(public alertController: AlertController,private storage: Storage, private router: Router, public _apiService : ApiService) {
    this.dateTime = new Date().toISOString();
    
   }

  ngOnInit() {
    this.storage.create();
    this.storage.get('session_storage').then((res)=>{
      this.datauser = res;

      let data = {
        username : this.datauser.username
        
      }

      this._apiService.concerns(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.concernsInfo = res.result;
        
        this.firstName = this.concernsInfo.firstName;
        this.lastName = this.concernsInfo.lastName;
        this.middleName = this.concernsInfo.middleName;
        this.suffix = this.concernsInfo.suffix;
        
        this.companyName = this.concernsInfo.companyName;
        this.contactNo = this.concernsInfo.contactNo;
        
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )

      this._apiService.evaluation(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.evaluationInfo = res.result;

        this.supervisorID = this.evaluationInfo.supervisorID;
        
        
         
  
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

      this._apiService.concerns(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.concernsInfo = res.result;
        
        this.firstName = this.concernsInfo.firstName;
        this.lastName = this.concernsInfo.lastName;
        this.middleName = this.concernsInfo.middleName;
        this.suffix = this.concernsInfo.suffix;
        
        this.companyName = this.concernsInfo.companyName;
        this.contactNo = this.concernsInfo.contactNo;
        
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
    });
  }

  sendConcern(){

      if(this.isEnabled){
        let data = {
          username : this.datauser.username,
          subject : this.subject,
          concern : this.concern,
          dateTime : this.dateTime,
          studentNumber : this.studentNumber,
          toUser : this.toUser
        }

        if(data.studentNumber==null){
          this.emptyToUser();
        }else{
          this._apiService.addConcern(data).subscribe((res:any) => {
            console.log("SUCCESS ===",res);
            this.subject = "";
            this.concern = "";
            this.toUser = "";
            this.studentNumber = "";
  
            this.presentSentAlert();
    
            
          },(error:any) => {
            console.log("ERROR ===", error);
          }
          )
        }
        
       
      }else{
        let data = {
          username : this.datauser.username,
          subject : this.subject,
          concern : this.concern,
          dateTime : this.dateTime,
          toUser : this.toUser
          

        }

        this._apiService.addConcern(data).subscribe((res:any) => {
          console.log("SUCCESS ===",res);
          this.subject = "";
          this.concern = "";
          this.toUser = "";
          this.studentNumber = "";
          
          this.presentSentAlert();
  
          
        },(error:any) => {
          console.log("ERROR ===", error);
        }
        )
      }
     

      
  
      
    
  }

  cancelConcern(){
    this.subject = ""
    this.concern = ""

   
    
  }

  selectWhoseAdviser(){
    if(this.toUser=="adviser"){
      this.isEnabled=true;
    }else{

      this.isEnabled=false;
    }
  }

  async presentAlert() {

    const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Sending Concern',
     message: 'Send concern?',
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
           this.sendConcern();
           this.router.navigate(['/concerns']);
           console.log('Confirm Okay');
         }
       }
     ]
   });

   await alert.present();
 }

 async presentSentAlert() {

  const alert = await this.alertController.create({
   cssClass: 'my-custom-class',
   header: 'Sent',
   message: 'Concern Sent Succesfully!',
   buttons: [
      {
       text: 'Ok',
       handler: () => {
         this.router.navigate(['/concerns']);
         console.log('Confirm Okay');
       }
     }
   ]
 });

 await alert.present();
}

async emptyToUser() {

  const alert = await this.alertController.create({
   cssClass: 'my-custom-class',
   header: 'Error',
   message: 'You did not select whose adviser to send concern!',
   buttons: [
      {
       text: 'Ok',
       handler: () => {
      
       }
     }
   ]
 });

 await alert.present();
}
}
