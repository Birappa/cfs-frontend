import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api-service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  feedbackForm: FormGroup;
  questions: FormArray;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: Router) {
/* 
    this.feedbackForm = new FormGroup({
      titleOfTraining: new FormControl(),
      trainerName: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      daysSurveyAvailable: new FormControl(),
      question1: new FormControl(),
      question2: new FormControl(),
      question3: new FormControl(),
      question4: new FormControl(),
      question5: new FormControl()

    }); */
   }

  ngOnInit() {

    this.feedbackForm = this.formBuilder.group({
      formId:1,
      titleOfTraining: [''],
      trainerName: [''],
      startDate: [''],
      endDate: [''],
      daysSurveyAvailable: '',
      question1: [''],
      question2: [''],
      question3: [''],
      question4: [''],
      question5: ['']
    });

  }

  initQuestion():FormControl {
   /*  return this.formBuilder.group({
      newQuestion: ['']
    }); */
     
    return new FormControl();
  }
  addQuestion() {
    this.questions = <FormArray>this.feedbackForm.controls['questions'];
    this.questions.push(this.initQuestion());
  }
  removeQuestion(i: number) {
    this.questions = <FormArray>this.feedbackForm.controls['questions'];
    this.questions.removeAt(i);
  }

  onSubmit() {

    /* if (this.feedbackForm.invalid) {
      return
    }
 */

   
    /* const feedbackPayload = {
      titleOfTraining: this.feedbackForm.controls['titleOfTraining'].value,
      trainerName: this.feedbackForm.controls['trainerName'].value,
      startDate: this.feedbackForm.controls['startDate'].value,
      endDate: this.feedbackForm.controls['endDate'].value,
      daysSurveyAvailable: this.feedbackForm.controls['daysSurveyAvailable'].value,
      questions: [this.feedbackForm.controls['questions1'].value,
        this.feedbackForm.controls['questions2'].value,
        this.feedbackForm.controls['questions3'].value,
        this.feedbackForm.controls['questions4'].value,
        this.feedbackForm.controls['questions5'].value
      ]
    }
    */
    this.api.sendFeedbackForm(this.feedbackForm.value)
    .subscribe(response=>{
        alert("Feedback form successfully sent");
        this.route.navigate(['/admin-page']);
    }, error=>console.log("Server Error!!"));

  }

}
