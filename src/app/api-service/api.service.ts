import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl="http://10.77.16.192:1000";
  employee = "/employee";
  feedback = "/feedback";

  feedbackObject: any;

  constructor(private http: HttpClient) { }

  login(loginPayload) : Observable<any> {
    return this.http.post(this.baseUrl+ this.employee +'/login', loginPayload);
  }

  signup(signupPayload) : Observable<any> {
    return this.http.post(this.baseUrl + this.employee + '/register', signupPayload);
  }

  sendFeedbackForm(formValue){
    return this.http.post(this.baseUrl + this.feedback,formValue);
  }

  saveFeedbackForm(formValue){
    return this.http.post(this.baseUrl + this.feedback,formValue);
  }

  getFeedbackFormById(id){
    return this.http.get(this.baseUrl + this.feedback + '/' + id);
  }

  getAllPendingFeedback(){
    return this.http.get(this.baseUrl + this.feedback);
  }

  getAllFeedbackRatings(){
    return this.http.get(this.baseUrl+"/home")
  }

}
