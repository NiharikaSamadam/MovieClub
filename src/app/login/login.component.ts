import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminserviceService } from '../adminservice.service';
import { LocalStorageService } from '../local-storage.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
 
  subscription : Subscription
 
  usertype : string
  username : string
  loginStatus : boolean = false

  constructor(private router :Router,private us:UserserviceService,
              private as:AdminserviceService,private ls: LocalStorageService,
              private toastr:ToastrService) { }
 

  ngOnInit(): void {

  
}


onSubmit(ref){
  let credObj = ref.value

  localStorage.setItem("usertype",credObj.usertype)

  if(credObj.usertype == "user"){

    //set usertype
    this.usertype = credObj.usertype
    this.ls.setUserType(this.usertype)

    delete credObj.usertype
    
    this.us.loginUser(credObj).subscribe(
      res=>{
         
        if(res['message'] == "Login Success"){
         
          localStorage.setItem("token",res['token'])
          localStorage.setItem("username",res['username'])
          
          //set username
          this.username = res['username']
          this.ls.setUsername(this.username)

          //set loginstatus
          this.loginStatus = true
          this.ls.setLoginStatus(this.loginStatus)

          //navigate to userdashboard
          this.router.navigateByUrl(`/userdashboard/${credObj.username}/movies`)
        }

        else{
          //alert(res['message'])
          this.toastr.warning(res['message'])
        }
      },
      err=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  }

  if(credObj.usertype == "admin"){
    
    //set usertype
    this.usertype = credObj.usertype
    this.ls.setUserType(this.usertype)
    
    delete credObj.usertype

    this.as.loginAdmin(credObj).subscribe(
        res =>{
          if(res['message'] == "Login Success"){
           
            localStorage.setItem("token",res['token'])
            localStorage.setItem("username",res['username'])
           
            
             //set username
          this.username = res['username']
          this.ls.setUsername(this.username)

          //set loginstatus
          this.loginStatus = true
          this.ls.setLoginStatus(this.loginStatus)

            //navigate to userdashboard
            this.router.navigateByUrl(`/admindashboard/${credObj.username}/movieslist`)
          }

          else{
            //alert(res['message'])
            this.toastr.warning(res['message'])
          }
        },
        err=>{
          this.toastr.error("Something Went Wrong")
          console.log(err)
        }
    )
}

}
  register(){
   
    //navigate to register
    this.router.navigateByUrl("/register")
  }

 
  
}
