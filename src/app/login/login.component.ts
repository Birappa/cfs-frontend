import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  visibility: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService) {
    this.loginForm =new FormGroup({
      role: new FormControl(''),
      empId: new FormControl(''),
      password: new FormControl('')
    });
   }

  ngOnInit() {
    window.localStorage.removeItem('username');
    this.loginForm = this.formBuilder.group({
      role: ['', Validators.required],
      empId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
   
    const loginPayload = {
      empId: this.loginForm.controls.empId.value,
      password: this.loginForm.controls.password.value
    }
    this.api.login(this.loginForm.value).subscribe(response => {

      if(response.statusCode === 200) {
        console.log(response)
        window.localStorage.setItem('username', response.employee.fullName);
        window.localStorage.setItem('empId', response.employee.empId);
        if(response.employee.role==="admin"){
          this.router.navigate(['/admin-page']);
        }
        else{
          this.router.navigate(['/employee-page']);
        }
        
      }else {
        this.invalidLogin = true;
        alert(response.message);
      }
    }, error=>console.log("server error!!"));
  }

  checkRole(){
    
    if(this.loginForm.controls.role.value=="employee"){
      this.visibility = true;
    }
    else{
      this.visibility = false;
    }
  }

}
