import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(private router: Router,private storage: Storage) {

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
}
