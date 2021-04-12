import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private us : UserserviceService,private toastr : ToastrService,
              private router : Router,private ls:LocalStorageService) { }

  username : string;

  userObj :any

  ngOnInit(): void {
    this.username = localStorage.getItem("username")
   
    this.us.getUser(this.username).subscribe(
      res =>{
        if(res['message'] == 'failed'){
          
          //clear localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])
          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
           
          this.userObj = res['message']
          
        }
      },
      err =>{
          
        this.toastr.error("Something went wrong")
        console.log(err)
      }
    )

  }

  onClick(){
    this.router.navigateByUrl(`/userdashboard/${this.username}/movies`)
  }

}
