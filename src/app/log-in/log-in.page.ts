import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  username : any;
  password : any;
  dataUser : any;

  constructor(public toastCtrl: ToastController,private storage: Storage, private router: Router, public _apiService : ApiService) { }

  ngOnInit() {
    this.storage.create();
  }
  

  logIn(){
    let data = {
      username : this.username,
      password : this.password

    }
    this._apiService.logIn(data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);

      this.storage.set('session_storage', res.result);

      this.storage.get('session_storage').then(async (res)=>{
        this.dataUser = res;

        const toast = await this.toastCtrl.create({
          message: 'Login Succesfully!',
          duration: 2000
        });

        toast.present();
  
      });
    
      this.router.navigate(['/list-of-students']);

    },async (error:any) => {
      const toast = await this.toastCtrl.create({
        message: 'Incorrect username or password!',
        duration: 2000
      });

      toast.present();
      console.log("ERROR ===", error);
    }
    )
  }

  forgotPassword(){
  
  }
}
