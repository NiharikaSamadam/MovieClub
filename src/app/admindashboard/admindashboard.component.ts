import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  opened: boolean = false;
 
  toggleSidebar() {
   this.opened = !this.opened;
 }

  
 activateRoute(){
  this.opened = !this.opened
}
 

 
}
