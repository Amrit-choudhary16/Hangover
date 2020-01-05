import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  telNumber;
  value;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  iskeyUpNumber(evt) {
    this.telNumber = isNaN(this.telNumber) ? this.telNumber.slice(0, -1) : this.telNumber.trim().toString();
  }

  // onSubmit(form: NgForm) {
  //   // if (!form.valid) {
  //   //   return;
  //   // }
  //   this.router.navigateByUrl('/drink');
  // }

  onLogin() {
    const navigationExtras: NavigationExtras = {
      state: {
        telnumber: this.telNumber,
        value: this.value
  }
  };
    this.router.navigate(['/drink'], navigationExtras);
  }
}
