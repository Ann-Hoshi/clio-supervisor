import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { ApiService } from '../api.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { sample } from 'rxjs/operators';


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
})
export class AddDocumentPage implements OnInit {
  fileName : any;
  weekNumber : any;
  fileTransfer : FileTransferObject;
  option : any;
  nativePath : any;
  datauser : any;
  studentNumber : any;

  constructor(private route: ActivatedRoute, private toastCtrl: ToastController,public alertController: AlertController,private router: Router,private storage: Storage,private fileChooser: FileChooser,private filePath : FilePath,private file: File,private transfer: FileTransfer, public _apiService : ApiService) { 
      this.route.params.subscribe((param:any) => {
      this.studentNumber = param.studentNumber;
    })
  }

  ngOnInit() {
   
  }

  selectForm() {
    

    this.fileChooser.open().then((uri)=>{ 
      this.filePath.resolveNativePath(uri).then(
        (nativePaths)=>{
          this.nativePath = nativePaths;
        },(err)=>{
          alert(JSON.stringify(err));
        }
      )
  },(err)=>{
    alert(JSON.stringify(err));
  }) 
    
  }

  uploadForm() {
   
    if(this.weekNumber==null){
      this.presentToast("Week Number is Empty!")
      
    }else if(this.nativePath==null){
      this.presentToast("No PDF File Attached!")
    }else{

      this.fileName = new Date().getTime() + '.pdf';

      let data = {
        studentNumber :  this.studentNumber,
        fileName : this.fileName ,
        weekNumber : this.weekNumber
      }
      this._apiService.uploadReportForm(data).subscribe((res:any) => {
  
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: this.fileName,
          chunkedMode: false,
          headers: {}, 
        }
  
        this.fileTransfer = this.transfer.create();
        this.fileTransfer.upload(this.nativePath, 'http://clio-rms.com/backendstudent/uploadDP.php',options).then((data)=>{
            
          },(err)=>{
            alert(JSON.stringify(err));
          });
  
          this.fileTransfer.upload(this.nativePath, 'http://clio-rms.com/CI-Login-master/uploadToWeb.php',options).then((data)=>{
            
          },(err)=>{
            alert(JSON.stringify(err));
          });

          this.fileTransfer.upload(this.nativePath, 'http://clio-rms.com/backend/uploadDP.php',options).then((data)=>{
            
          },(err)=>{
            alert(JSON.stringify(err));
          });
  
          
  
  
        console.log("SUCCESS ===",res);
       
        this.presentSentAlert();
        this.nativePath = "";
        this.fileName = "";
        
  
      },(error:any) => {
  
        console.log("ERROR ===", error);
       
      }
      )
    }
   

  }
  async presentSentAlert() {

    const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Upload',
     message: 'PDF Form Uploaded Succesfully!',
     buttons: [
        {
         text: 'Ok',
         handler: () => {
          this.router.navigate(['/week-reports/'+this.studentNumber]);
           console.log('Confirm Okay');
         }
       }
     ]
   });
  
   await alert.present();
  }

  // Little helper
async presentToast(text) {
  const toast = await this.toastCtrl.create({
    message: text,
    duration: 3000,
  });
  toast.present();
}

}
