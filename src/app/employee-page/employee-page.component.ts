import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit {

  feedbackList:any;
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {

    this.api.getAllPendingFeedback()
    .subscribe((response: any)=>{
      if(response.status==200){
        this.feedbackList = response.object;
      }
    },error=>console.log("Server Error!!"));

  }

  saveFeedback(formId){
   /*  this.api.feedbackObject = feedback; */
   localStorage.removeItem('formId');
   localStorage.setItem('formId', formId);
    this.route.navigate(['/feedback']);
  }

}
