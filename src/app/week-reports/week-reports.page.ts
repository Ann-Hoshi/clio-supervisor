import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { Directory, Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-week-reports',
  templateUrl: './week-reports.page.html',
  styleUrls: ['./week-reports.page.scss'],
})
export class WeekReportsPage implements OnInit {
  
  fileName : any ;
  datauser : any ;
  accountInfo : any ;
  fileInfo : any;
  fileTransfer : FileTransferObject;
  option : any;
  downloadUrl : any;
  downloadProgress : any;

  studentNumber : any;

  constructor(private route: ActivatedRoute,private fileOpener: FileOpener,public http: HttpClient,public alertController: AlertController,private router: Router,private storage: Storage,private fileChooser: FileChooser,private filePath : FilePath,private file: File,private transfer: FileTransfer, public _apiService : ApiService) {
    this.route.params.subscribe((param:any) => {
      this.studentNumber = param.studentNumber;
    })
   }

  ngOnInit() {
    this.storage.create();

    this.storage.get('session_storage').then((res)=>{
      this.datauser = res;

      let data = {
        studentNumber : this.studentNumber
      }

      this._apiService.getFiles(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        
        this.accountInfo = res.result;
       
  
      },(error:any) => {
        console.log("ERROR ===", error);
      }
      )
      
    
    });
  }
  ionViewWillEnter(){
    this.ngOnInit();
  }

  addDocuments(){
    this.router.navigate(['/add-document']);
  }

  private convertBlobToBase64 = (blob : Blob) => new Promise((resolve,reject)=> {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  }) ;

  download(id){

    let data = {
      id : id
    }

    this._apiService.getFile(data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);

        this.fileInfo = res.result
     

        this.downloadUrl = "http://www.clio-rms.com/backendstudent/uploads/" + this.fileInfo.fileName;

        this.http.get(this.downloadUrl, {
            responseType : 'blob',
            reportProgress : true,
            observe : 'events'
        }).subscribe(async event => {

          if(event.type === HttpEventType.DownloadProgress){
              this.downloadProgress = Math.round ((100* event.loaded) / event.total)
            
          }else if(event.type === HttpEventType.Response){
            this.downloadProgress = 0;
            
          

                this.file.writeFile(this.file.dataDirectory, this.fileInfo.fileName, event.body, { replace: true }).then(fileEntry => {
                  alert(JSON.stringify("Downloaded and opening pdf file..."));
                  // Open the PDf with the correct OS tools
                  this.fileOpener.open(this.file.dataDirectory + this.fileInfo.fileName, 'application/pdf');
                })
            
          }
            
        })
          
        
        

    },(error:any) => {
      console.log(error);
      
    }
    )
  }

}
