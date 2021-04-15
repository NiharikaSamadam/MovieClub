import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'online-video-gallery';

  usertype : string
  username : string
  loginStatus : boolean;

  constructor(private ls : LocalStorageService,private router : Router){}

  ngOnInit(): void {
    
    //get login status
    this.ls.getLoginStatus().subscribe(
      status => {
        this.loginStatus = status
        
      }
    )

    //get username
    this.ls.getUsername().subscribe(
      name => {
        this.username = name
        
      }
    )

    //get usertype
    this.ls.getUserType().subscribe(
      type => {
        this.usertype = type
        
      }
    )

    if(localStorage.getItem("username") != null){

      this.loginStatus = true
      this.username = localStorage.getItem("username")
      this.usertype = localStorage.getItem("usertype")
     
    }

  }

  dashboard(){
    if(this.usertype == "user"){
      //navigate to userdashboard
      this.router.navigateByUrl(`/userdashboard/${this.username}/movies`)
    }

    if(this.usertype == "admin"){
      //navigate to admindashboard
      this.router.navigateByUrl(`/admindashboard/${this.username}/movieslist`)
    }
  }

  logOut(){
   this.ls.logOutService()
   this.router.navigateByUrl("/home")
  }
}
