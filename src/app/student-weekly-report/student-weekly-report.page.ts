import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-student-weekly-report',
  templateUrl: './student-weekly-report.page.html',
  styleUrls: ['./student-weekly-report.page.scss'],
})
export class StudentWeeklyReportPage implements OnInit {
  datauser : any;
  username : any;
  weeklyReportInfo : any;
  weeklyReportID : any;

  firstName : any;
  middleName : any;
  lastName : any;
  suffix : any;

  date : any;
  timeIn : any;
  timeOut : any;
  tasks : any;
  learning : any;
  src : any;
  isApproved : any;
  studentNumber : any;

  constructor(public alertController: AlertController, private storage: Storage, private router: Router, public _apiService : ApiService,private route: ActivatedRoute, private toastCtrl: ToastController) { 
    this.route.params.subscribe((param:any) => {
      this.weeklyReportID = param.weeklyReportID;
    })
  }

  ngOnInit() {
    

      let data = {
        weeklyReportID : this.weeklyReportID
        
      }

      this._apiService.weeklyReport(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.weeklyReportInfo = res.result;
        
        this.firstName = this.weeklyReportInfo.firstName;
        this.lastName = this.weeklyReportInfo.lastName;
        this.middleName = this.weeklyReportInfo.middleName;
        this.suffix = this.weeklyReportInfo.suffix;
        
        this.date = this.weeklyReportInfo.date;
        this.timeIn = this.weeklyReportInfo.timeIn;
        this.timeOut = this.weeklyReportInfo.timeOut;
        this.tasks = this.weeklyReportInfo.tasks;
        this.learning = this.weeklyReportInfo.learning;
        this.isApproved = this.weeklyReportInfo.isApproved;
        this.studentNumber = this.weeklyReportInfo.studentNumber;

        this.src = `http://www.clio-rms.com/backendstudent/uploads/${this.weeklyReportInfo.dtrImage}`;
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
   
  }

  ionViewWillEnter(){
    

      let data = {
        weeklyReportID : this.weeklyReportID
        
      }

      this._apiService.weeklyReport(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.weeklyReportInfo = res.result;
        
        this.firstName = this.weeklyReportInfo.firstName;
        this.lastName = this.weeklyReportInfo.lastName;
        this.middleName = this.weeklyReportInfo.middleName;
        this.suffix = this.weeklyReportInfo.suffix;
        
        this.date = this.weeklyReportInfo.date;
        this.timeIn = this.weeklyReportInfo.timeIn;
        this.timeOut = this.weeklyReportInfo.timeOut;
        this.tasks = this.weeklyReportInfo.tasks;
        this.learning = this.weeklyReportInfo.learning;
        
        
        this.src = `http://www.clio-rms.com/backendstudent/uploads/${this.weeklyReportInfo.dtrImage}`;
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
    
  }



  notValid(){
    this.router.navigate([`list-of-students-weekly-report/${this.studentNumber}`]);
  }

  confirm(){

    let data = {
      weeklyReportID : this.weeklyReportID,
      isApproved : this.isApproved
    }

    this._apiService.confirmWeeklyReport(data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      
    
      this.presentToast('Student time record approved!');

      this.router.navigate([`list-of-students-weekly-report/${this.studentNumber}`]);


    },(error:any) => {
      console.log("ERROR ===", error);
    }
    )
    
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
    message: text,
    duration: 3000,
 });
 toast.present();
}

async presentAlert() {

  const alert = await this.alertController.create({
   cssClass: 'my-custom-class',
   header: 'DTR Approval',
   message: 'Approve DTR?',
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
         this.confirm();
         console.log('Confirm Okay');
       }
     }
   ]
 });

 await alert.present();
}

}
