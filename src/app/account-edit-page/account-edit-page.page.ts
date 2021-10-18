import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-edit-page',
  templateUrl: './account-edit-page.page.html',
  styleUrls: ['./account-edit-page.page.scss'],
})
export class AccountEditPagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  accountEditPageSave(){
    this.router.navigate(['/account']);
  }

  accountEditPageCancel(){
    this.router.navigate(['/account']);
  }
}
