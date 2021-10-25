import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(public alertController: AlertController,private router: Router,private storage: Storage) {

  }
  logOut(){
    this.storage.create();
    this.storage.clear();
    this.router.navigate(['/log-in'])
  }

  account(){
    this.router.navigate(['/account']);
  }

  weeklyReport(){
    this.router.navigate(['/list-of-students']);
  }

  evaluation(){
    this.router.navigate(['/evaluation']);
  }

  concerns(){
    this.router.navigate(['/concerns']);
  }
  async presentAlert() {

    const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Logging out',
     message: 'Are you sure you want to log-out?',
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
           this.logOut();
           
           console.log('Confirm Okay');
         }
       }
     ]
   });

   await alert.present();
 }
}
