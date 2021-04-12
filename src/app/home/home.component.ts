import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }


  ngOnInit(): void {
    if(localStorage.getItem("username")!=null){
      if(localStorage.getItem("usertype") == 'user'){
        this.router.navigateByUrl(`/userdashboard/${localStorage.getItem("username")}/movies`)
      }

      if(localStorage.getItem("usertype") == 'admin'){
        this.router.navigateByUrl(`/admindashboard/${localStorage.getItem("username")}/movieslist`)
      }
    }
   
  }

  
}
