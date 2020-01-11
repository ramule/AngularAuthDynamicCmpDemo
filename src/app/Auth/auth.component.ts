import { Component } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { AuthService, authResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  public isLoggedIn = true;

  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
    console.log(this.isLoggedIn);
  }

  onSubmit(form: NgForm) {

    if (!this.isLoggedIn) {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.login(email,password).subscribe(data=>{
        console.log(data);
      })
    }
    else {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signUp(email, password).subscribe(response => {
        console.log(response);
      });
    }
    form.reset();
  }
}
