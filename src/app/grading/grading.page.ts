import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.page.html',
  styleUrls: ['./grading.page.scss'],
})
export class GradingPage implements OnInit {


  gradingSystem;
  criteria;
  studentNumber;
  datauser;
  gradingSystemInfo;
  studentInfo;
  score;
  total;
  count = 0;

  pdfObj = null;

  c : any;

  firstName;
  middleName;
  lastName;
  suffix;
 

  constructor(private fileOpener: FileOpener,private route: ActivatedRoute,private file: File,public plt: Platform,public alertController: AlertController,private storage: Storage, private router: Router, public _apiService : ApiService) {  this.route.params.subscribe((param:any) => {
    this.studentNumber = param.studentNumber;
  }) }

  ngOnInit() {
    this.storage.create();
    this.storage.get('session_storage').then((res)=>{
      this.datauser = res;

      let data = {
        username : this.datauser.username
      }

      this._apiService.gradingSystem(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        this.gradingSystemInfo = res.result;
        
      
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
    });

    let data1 = {
      studentNumber : this.studentNumber
    }

    this._apiService.getStudent(data1).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      
      
       this.studentInfo = res.result;

       this.firstName = this.studentInfo.firstName;
       this.middleName = this.studentInfo.middleName;
       this.lastName = this.studentInfo.lastName;
       this.suffix = this.studentInfo.suffix;
      
    

    },(error:any) => {
      console.log("ERROR ===", error);
    }
    )
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  checkTotalHoursInput() {
    if(this.total==null){
      this.presentSentAlert();
    }else{
      this.createPdf(); 
    }
  }
  async presentSentAlert() {

    const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Error',
     message: 'No Total Score Input',
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
  createPdf() {
    this.c = 0 ;
   

   var rows = [];
   rows.push(['No.','Criteria', 'Description']);
   
   for(let file of this.gradingSystemInfo) {
     this.c++;
     
     rows.push([this.c,  file.gradingSystem,file.criteria, ]);
  }

   
   var docDefinition = {

     content: [
       
      
	  { text: 'PAMANTASAN NG LUNGSOD NG VALENZUELA' , style: 'subheader' , alignment: 'center' },
	  { text: 'INFORMATION TECHNOLOGY DEPARTMENT' , alignment: 'center' },
	  { text: 'Tongco St., Maysan, Valenzuela City' , alignment: 'center' },
    { text: '' },
	  
	  { text: 'NAME OF STUDENT:', style: 'subheader' },
	 
    { text: this.firstName + ' ' + this.middleName + ' ' + this.lastName + ' ' + this.suffix  },
	  { text: 'ESTABLISHMENT:', style: 'subheader' },
	   { text: 'Office of the University Registrar-PLV' },
	   
	  { text: ' ' },
	  { text: ' ' },
	   
	  { text: 'PERFORMANCE EVALUATION FORM', style: 'header' , alignment: 'center'},
	  { text: ' ' },
      
      { text: 'INSTRUCTION:', style: 'subheader' },
      { text: 'The following information comprises the criteria and description givin by the student OJT adviser or admin. Please kindly refer to this results from the score 5-1 (5 Highest) in the rating sheet you given the student prior for his/her endevours in the company.' },
       
      { text: ' ' },
      { text: ' ' },
      
      
	  
	  
	  
	  {
           
         layout: 'lightHorizontalLines', 
         
          table: {
            layout: 'lightHorizontalLines', 
            widths: [20, '*', 300],
            body: rows
               }
       },

       { text: ' ' },
       { text: ' ' },
       
       { text: 'Total Score:', style: 'subheader' },
       { text: this.total , style: 'subheader' },

     ],
     styles: {
       header: {
         fontSize: 18,
         bold: true,
       },
       subheader: {
         fontSize: 14,
         bold: true,
         margin: [0, 15, 0, 0]
       },
       story: {
         italic: true,
         alignment: 'center',
         width: '50%',
       }
     }
   }
   this.pdfObj = pdfMake.createPdf(docDefinition);
 }

 change(id){
  this.count += id;
  this.total = this.count;
}

 downloadPdf() {
   this.total = ""
  if (this.plt.is('cordova')) {
    this.pdfObj.getBuffer((buffer) => {
      var blob = new Blob([buffer], { type: 'application/pdf' });
      
    
      // Save the PDF to the data Directory of our App
      this.file.writeFile(this.file.dataDirectory, 'Weekly Report.pdf', blob, { replace: true }).then(fileEntry => {
        // Open the PDf with the correct OS tools
        alert(JSON.stringify("Downloaded and opening pdf file..."));
        this.fileOpener.open(this.file.dataDirectory + 'Weekly Report.pdf', 'application/pdf');
      })
    });
  } else {
    
    // On a browser simply use download!
    this.pdfObj.download();
   
  }
}

  }


