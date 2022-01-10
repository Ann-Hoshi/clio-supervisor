import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.page.html',
  styleUrls: ['./grading.page.scss'],
})
export class GradingPage implements OnInit {


  gradingSystem;
  criteria;

  datauser;
  gradingSystemInfo;

  pdfObj = null;

  c : any;
 

  constructor(private fileOpener: FileOpener,private file: File,public plt: Platform,public alertController: AlertController,private storage: Storage, private router: Router, public _apiService : ApiService) { }

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
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  createPdf() {
    this.c = 0 ;
   

   var rows = [];
   rows.push(['No.','Criteria', 'Description', '5', '4' ,'3', '2', '1']);
   
   for(let file of this.gradingSystemInfo) {
     this.c++;
     
     rows.push([this.c,  file.gradingSystem,file.criteria, 'O', 'O', 'O', 'O', 'O']);
  }

   
   var docDefinition = {

     content: [
       
      
	  { text: 'PAMANTASAN NG LUNGSOD NG VALENZUELA' , style: 'subheader' , alignment: 'center' },
	  { text: 'INFORMATION TECHNOLOGY DEPARTMENT' , alignment: 'center' },
	  { text: 'Tongco St., Maysan, Valenzuela City' , alignment: 'center' },
	  { text: ' ' },
	  
	  { text: 'NAME OF STUDENT:', style: 'subheader' },
	   { text: ' ' },
	  { text: ' _______________________________________' },
	  { text: 'ESTABLISHMENT:', style: 'subheader' },
	   { text: 'Office of the University Registrar-PLV' },
	  { text: 'PERIOD OF TRAINING:', style: 'subheader' },
	   { text: 'From: ____________' },
	    { text: 'To: ____________' },
	   
	  { text: ' ' },
	  { text: ' ' },
	   
	  { text: 'PERFORMANCE EVALUATION FORM', style: 'header' , alignment: 'center'},
	  { text: ' ' },
      
      { text: 'INSTRUCTION:', style: 'subheader' },
      { text: 'Please Evaluate the student according to the company standards, job specification, individual standard of performance. Fill up the corresponding rate opposite to each item characteristics which you think best describes the student trainee based on the following ratings: (5) for the highest and (1) for the lowest score.' },
       
      { text: ' ' },
      { text: ' ' },
      
      
	  
	  
	  
	  {
           
         layout: 'lightHorizontalLines', // optional
         
          table: {
                  layout: 'lightHorizontalLines', // optional
                  widths: ['*', 50, 200, '*', '*', '*', '*', '*'],
                  body: rows
               }
       },
       
       { text: ' ' },
       { text: ' ' },
       { text: ' ' },
           { text: ' ' },
             { text: ' ' },
               { text: ' ' },
                 { text: ' ' },
                  { text: ' ' },
           { text: ' ' },
             { text: ' ' },
               { text: ' ' },
                 { text: ' ' },
                  { text: ' ' },
           { text: ' ' },
           
       { text: 'COMMENTS:', style: 'subheader' },
       
     
       
      
       { text: 'A. STRONGPOINTS:', style: 'subheader' },
         { text: ' ' },
             { text: ' ' },
               { text: ' ' },
                 { text: ' ' },
                  { text: ' ' },
           { text: ' ' },
       { text: 'B. SUGGESTIONS:', style: 'subheader' },
        { text: ' ' },
             { text: ' ' },
               { text: ' ' },
                 { text: ' ' },
                  { text: ' ' },
           { text: ' ' },
       
        { text: 'C. BRIEF DESCRIPTION OF THE SPECIFIC JOBS UNDERTAKEN DURING THE TRAINING:', style: 'subheader' },
 { text: ' ' },
             { text: ' ' },
               { text: ' ' },
                 { text: ' ' },
                  { text: ' ' },
           { text: ' ' },
           
            { text: 'This certificates that _____________________________________, a student of PAMANTASAN NG LUNGSOD NG VALENZUELA has accomplished a total of _____ hours in practicum training in this establishment.' },  
	           { text: ' ' },
	              { text: ' ' },
	              
	         { text: 'DATE:____________________', style: 'subheader' },
	          { text: 'CERTIFIED BY:____________________', style: 'subheader' },
	         { text: 'NAME:____________________', style: 'subheader' },
	         { text: 'DESIGNATION/RANK:____________________', style: 'subheader'},
	         
	           { text: ' ' },
	              { text: ' ' },
	             { text: ' ' },
	             
	              { text: 'Would you recommend this student for future employment in your own firm? ' },
	
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

 downloadPdf() {
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


