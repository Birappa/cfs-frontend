import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  invalidSignup: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService) {
    this.signupForm =new FormGroup({
      role: new FormControl(''),
      empId: new FormControl(''),
      fullName: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
      password: new FormControl('')
    });
   }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      role: ['employee', Validators.required],
      empId: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){

    if (this.signupForm.invalid) {
      return;
    }

    this.api.signup(this.signupForm.value).subscribe(data => {
      if(data.statusCode === 200) {
        this.router.navigate(['/login']);
      }else {
        this.invalidSignup = true;
        alert(data.message);
      }
    });
  }

}
