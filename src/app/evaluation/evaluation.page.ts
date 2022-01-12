import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { present } from '@ionic/core/dist/types/utils/overlays';

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
  
 
  fileName : any;
  fileTransfer : FileTransferObject;
  option : any;
  nativePath : any;
 
  constructor(private fileChooser: FileChooser,private filePath : FilePath,private file: File,private transfer: FileTransfer, private loadingCtrl: LoadingController,private http: HttpClient,public alertController: AlertController,public toastCtrl: ToastController,private storage: Storage, private router: Router, public _apiService : ApiService) {


   }

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
    this.fileChooser.open().then((uri)=>{ 
      this.filePath.resolveNativePath(uri).then(
        (nativePaths)=>{
          this.nativePath = nativePaths;
        },(err)=>{
        
        }
      )
  },(err)=>{
  
  }) 
  }

  cancelEvaluation(){
    this.remarks = "";
    this.nativePath = "";
    this.studentNumber = "";
    
    
  }

  


  async uploadData(formData: FormData) {
    
    
    const loading = await this.loadingCtrl.create({
        message: 'Uploading image...',
    });
    await loading.present();
  
    // Use your own API!
    const url = 'http://clio-rms.com/backend/uploadDP.php';
  
    this.http.post(url, formData)
        .pipe(
            finalize(() => {
                loading.dismiss();
                this.presentToast('Account updated successfully.')
                
            })
        )
        .subscribe(res => {
            if (res['success']) {
              
            } else {
              this.presentToast('File upload failed.')
            }
        });
  }
  
  
    async presentToast(text) {
        const toast = await this.toastCtrl.create({
        message: text,
        duration: 3000,
     });
     toast.present();
  }

  saveEvaluation(){
    this.fileName = new Date().getTime() + '.pdf';

    let data = {
      username : this.datauser.username,
      remarks : this.remarks,
      studentNumber : this.studentNumber,
      evaluationForm : this.fileName,
      evaluationDate : new Date().toLocaleDateString()
    }
    this._apiService.evaluationRemarks(data).subscribe((res:any) => {

      
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.fileName,
        chunkedMode: false,
        headers: {}, 
      }
      this.fileTransfer = this.transfer.create();
      this.fileTransfer.upload(this.nativePath, 'http://clio-rms.com/backend/uploadDP.php',options).then((data)=>{
          
        },(err)=>{
         
        });
        this.fileTransfer.upload(this.nativePath, 'http://clio-rms.com/CI-Login-master/uploadToWeb.php',options).then((data)=>{
          
        },(err)=>{
        
        });


      console.log("SUCCESS ===",res);
     
      
      this.presentSentAlert();
      this.remarks = "";
      this.nativePath = "";
      this.studentNumber = "";
      
    },(error:any) => {

   
     
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

          if(this.studentNumber==null){
              this.presentToast('No selected student!')
          }else if(this.nativePath==null){
            this.presentToast('No selected file!')
          }else{
            this.saveEvaluation();
          }
          
          
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
