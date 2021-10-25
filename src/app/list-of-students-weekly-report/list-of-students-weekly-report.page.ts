import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-of-students-weekly-report',
  templateUrl: './list-of-students-weekly-report.page.html',
  styleUrls: ['./list-of-students-weekly-report.page.scss'],
})
export class ListOfStudentsWeeklyReportPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  weeklyReport(){
    this.router.navigate(['/student-weekly-report']);
  }

}
