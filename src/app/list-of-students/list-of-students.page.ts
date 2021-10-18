import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-of-students',
  templateUrl: './list-of-students.page.html',
  styleUrls: ['./list-of-students.page.scss'],
})
export class ListOfStudentsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  student(){
    this.router.navigate(['/student-weekly-report']);
  }
}
