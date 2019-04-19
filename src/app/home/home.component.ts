import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  feedbackRatings: any
  constructor(private api: ApiService) { }

  ngOnInit() {

    this.api.getAllFeedbackRatings()
    .subscribe(response=>this.feedbackRatings = response,
      error=>console.error("Server Error!!"))
    
  }

}
