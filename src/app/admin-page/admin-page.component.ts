import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  feedbackList:any
  constructor(private api: ApiService) { }

  ngOnInit() {

    this.api.getAllPendingFeedback()
    .subscribe((response: any)=>{
      if(response.status==200){
        this.feedbackList = response.object;
      }
    },error=>console.log("Server Error!!"));
    
  }

}
