import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackObject:any;
  feedbackForm: FormGroup;
  numbers: ['1','2','3','4','5'];
  constructor(private api: ApiService, private route: Router, private fb: FormBuilder) {
    
   }

  ngOnInit() {

    /* this.api.getFeedbackFormById(localStorage.getItem("id"))
      .subscribe(response => {

      }) */

      this.feedbackForm = this.fb.group({
        empId: 1,
        formId:1,
        question1: [''],
        question2: [''],
        question3: [''],
        question4: [''],
        question5: [''], 
        answer1: [''],
        answer2: [''],
        answer3: [''],
        answer4: [''],
        answer5: [''],
        ratings: [''] 
      })

      /* this.feedbackObject = this.api.feedbackObject;
      this.feedbackForm.patchValue(this.feedbackObject);
      console.log(this.feedbackObject) */
     

      this.api.getFeedbackFormById(localStorage.getItem('formId').trim())
      .subscribe((response: any)=>{
       console.log(response);
       this.feedbackObject = response.object;
       this.feedbackForm.patchValue(this.feedbackObject);
      },
        error=>console.error("Server Error!!"));
        
  }

onSubmit(){

  this.api.saveFeedbackForm(this.feedbackForm.value)
  .subscribe(response=>{
    alert("Feedback successfully submitted");
    this.route.navigate(['/employee-page']);
  })
}

}
