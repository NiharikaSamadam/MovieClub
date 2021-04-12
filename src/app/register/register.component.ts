import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router : Router,private us:UserserviceService,
              private toastr:ToastrService) { }

  submitted : boolean = false
  registerForm: FormGroup
  subscription : Subscription
 
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username : new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern(/^[a-zA-Z ]*$/)]),
      email : new FormControl('',[Validators.required,Validators.email]),
      phone : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[6789]\d{9}$/)]),
      password : new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)]),
      confirmpassword: new FormControl('',[Validators.required]),
    })
  }

  getcontrols(){
    return this.registerForm.controls
  }
  onSubmit(){
    this.submitted = true
    if(this.registerForm.valid){

      let userObj = this.registerForm.value
      this.us.createUser(userObj).subscribe(
        res=>{

          if(res['message'] == "user created successfully"){
             
             this.toastr.success(res['message'])
             //navigate to login
             this.router.navigateByUrl("/login")
          }
          else{
            
            this.toastr.info(res['message'])
          }
        },
        err=>{
          this.toastr.error("Something went wrong")
          console.log(err)
        }
      )
    }
  }

  login(){
    //navigate to login
    this.router.navigateByUrl("/login")
  }


}
