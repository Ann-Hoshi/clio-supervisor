import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-concerns',
  templateUrl: './concerns.page.html',
  styleUrls: ['./concerns.page.scss'],
})
export class ConcernsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sendConcern(){
  
  }

  cancelConcern(){
    
  }

}
