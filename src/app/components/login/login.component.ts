import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  IsError: boolean;
  errorMsg: string;

  ngOnInit(): void {
  }

  Login(obj) {
    this.IsError = false;
    // check if form is not undefined
    if (obj) {
      //if form is in valid state
      if (obj.form.status === 'VALID') {

        if (obj.value.Username == 'blogger@grapecity.com' && obj.value.Password == '1qaz!QAZ')
        //success
          this.router.navigateByUrl('/home');
        else {
          this.IsError = true;
          this.errorMsg = 'Invalid username/password. Please try again with correct credentials.';
        }
      } else {
        this.IsError = true;
        this.errorMsg = 'Please enter username/password.';
      }
    }
  }
}