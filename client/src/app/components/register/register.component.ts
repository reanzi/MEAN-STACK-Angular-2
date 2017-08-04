import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

    constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { 
    this.createForm()
   }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      repassword: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'repassword')})
  }

disableForm() {
  this.form.controls['email'].disable();
  this.form.controls['username'].disable();
  this.form.controls['password'].disable();
  this.form.controls['repassword'].disable();
}

enableForm() {
  this.form.controls['email'].enable();
  this.form.controls['username'].enable();
  this.form.controls['password'].enable();
  this.form.controls['repassword'].enable();

}


  validateEmail(controls) {
    const regExp = new 
     // Regular expression to test for a valid e-mail
    RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validEmail': true }
    }
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername' : true }
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{4,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword' : true }
    }
  }
  matchingPasswords(password, repasssword) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[repasssword].value) {
        return null;
      } else {
        return { 'matchingPasswords': true }
      }
    }
  }
  onRegisterSubmit(){
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }
    this.authenticationService.registerUser(user).subscribe(data => {
      if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.processing = false;
          this.enableForm();
      } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000)
      }
    });
  }
  checkUsername() {
    this.authenticationService.checkUsername(this.form.get('username').value).subscribe(data => {
      if (!data.success) {
        this.usernameValid = false;
        this.usernameMessage = data.message;
      } else {
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    });
  }
  checkEmail() {
    this.authenticationService.checkEmail(this.form.get('email').value).subscribe(data => {
      if (!data.success) {
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }


  ngOnInit() {
  }

}
