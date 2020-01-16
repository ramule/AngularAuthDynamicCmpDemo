import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { AuthService, authResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{

  public isLoggedIn = true;
  public isLoading = false;
  public error: String = null;
  @ViewChild(PlaceholderDirective, {static : false}) alertHost : PlaceholderDirective;
  private closeSub : Subscription;

  constructor(private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
    console.log(this.isLoggedIn);
  }

  onSubmit(form: NgForm) {

    this.isLoading = true;
    if (!this.isLoggedIn) {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.login(email, password).subscribe(data => {
        console.log(data);
        this.isLoading = !this.isLoading;
      },
        errorMsg => {
          console.log(errorMsg);
          this.error = errorMsg;
          this.showErrorAlert(errorMsg);
          this.isLoading = !this.isLoading;
        })
    }
    else {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signUp(email, password).subscribe(response => {
        console.log(response);
        this.isLoading = !this.isLoading;
      },
        errorMsg => {
          console.log(errorMsg);
          this.error = errorMsg;
          this.showErrorAlert(errorMsg);
          this.isLoading = !this.isLoading;
        });
    }
    form.reset();
  }

  onHandleError(){
    this.error = null;
  }



// Creating alert dynamically using componentFactoryResolver
  private showErrorAlert(message){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);    
    const hostViewContainerref = this.alertHost.viewContainerRef;
    hostViewContainerref.clear();
    const componentRef = hostViewContainerref.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerref.clear();
    })
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
