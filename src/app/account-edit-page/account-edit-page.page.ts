import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';

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
  contactNumber : any;
  companyName : any;
  password : any;

  blob : any;
  fileName : any;
  src : any;

  constructor(public alertController: AlertController,
    private storage: Storage, 
    private router: Router, 
    public _apiService : ApiService, 
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

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
        this.contactNumber = this.accountInfo.contactNo;
        this.companyName = this.accountInfo.companyName;
        this.password = "";
        this.src = `http://www.clio-rms.com/backend/uploads/${this.accountInfo.supervisorImage}`;
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
    });

    

  }

  ionViewWillEnter(){
    this.ngOnInit()
  }
  

  accountEditPageSave(){

    if(this.blob==null){
      this.presentToast("No Image Attached!")
    }else if(this.contactNumber==null){
      this.presentToast("Contact Number is Empty!")
    }else if(this.password==null){
      this.presentToast("Password is Empty!")
    }else{
      let data = {
        username : this.datauser.username,
        firstName : this.firstName,
        middleName :this.middleName,
        lastName : this.lastName,
        companyName : this.companyName,
        contactNumber : this.contactNumber,
        password : this.password,
        supervisorImage : this.fileName
      
      }
      
      this._apiService.editAccount(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.startUpload();
        
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    }
    
    
   
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
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async selectPhoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos 
  });

  if (image) {
      this.saveImage(image)
  }
  }

  async saveImage(photo: Photo) {

    const response = await fetch(photo.webPath);
    this.blob  = await response.blob();
    this.fileName  = new Date().getTime() + '.jpeg';
   
}
  async startUpload() {

   const formData = new FormData();
   formData.append('file', this.blob, this.fileName);
   this.uploadData(formData);

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
              this.router.navigate(['/account']);
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

}
