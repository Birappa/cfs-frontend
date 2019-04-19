import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = "birappa";
  visibility: boolean = false;
  constructor(private route: Router) { }

  ngOnInit() {

    const username = localStorage.getItem("username");
    if(username){
      this.visibility = true;
      this.username = username;
    }
    else{
      this.visibility = false;
    }
  }

  logout(){
    localStorage.removeItem("username");
    this.route.navigate(['/login']);
  }

}
