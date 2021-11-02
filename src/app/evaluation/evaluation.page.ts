import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {

  firstName : any;
  middleName : any;
  lastName : any;
  suffix: any;

  datauser : any;
  username : any;
  evaluationInfo : any;

  remarks : any;
  evaluationForm : any;
  studentNumber : any;
  supervisorID : any;

  constructor(public alertController: AlertController,public toastCtrl: ToastController,private storage: Storage, private router: Router, public _apiService : ApiService) { }

  ngOnInit() {
    this.storage.create();
    this.storage.get('session_storage').then((res)=>{
      this.datauser = res;

      let data = {
        username : this.datauser.username
      }

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

  uploadEvaluationForm(){
    
  }

  cancelEvaluation(){
    this.remarks = ""
    this.evaluationForm = ""
    
  }

  saveEvaluation(){
    let data = {
      username : this.datauser.username,
      remarks : this.remarks,
      studentNumber : this.studentNumber,
      evaluationForm : this.evaluationForm
    }
  
    


    
    this._apiService.evaluationRemarks(data).subscribe((res:any) => {

      console.log("SUCCESS ===",res);
     
      
      this.presentSentAlert();
      this.remarks = ""
      this.evaluationForm = ""
      
    },(error:any) => {

      console.log("ERROR ===", error);
     
    }
    )

    
  }
  async presentAlert() {
   
    
    const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Sending Evalution',
     message: 'Send Evaluation',
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
           this.saveEvaluation();
          
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
     message: 'Evaluation Sent Succesfully!',
     buttons: [
        {
         text: 'Ok',
         handler: () => {
           this.router.navigate(['/evaluation']);
           console.log('Confirm Okay');
         }
       }
     ]
   });
  
   await alert.present();
  }
}
