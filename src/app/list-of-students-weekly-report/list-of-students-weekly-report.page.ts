import { AbstractType, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-of-students-weekly-report',
  templateUrl: './list-of-students-weekly-report.page.html',
  styleUrls: ['./list-of-students-weekly-report.page.scss'],
})
export class ListOfStudentsWeeklyReportPage implements OnInit {

  studentNumber : any;
  
  weeklyReports : any;

  constructor(private router: Router,private route: ActivatedRoute,public _apiService : ApiService) { 
    this.route.params.subscribe((param:any) => {
      this.studentNumber = param.studentNumber;
    })
  }

 
  ngOnInit() {

    let data = {
      studentNumber : this.studentNumber
    }

    
    this._apiService.getWeeklyReport(data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.weeklyReports = res.result;

      
    },(error:any) => {
      console.log("ERROR ===", error);
    }
    )

  }

  weeklyReport(){
    this.router.navigate(['/student-weekly-report']);
  }

}
