import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private hc : HttpClient,private router:Router) { }

  //Login Status
  private status : boolean = false

  //create object to BehaviorSubject with initial value 
  private loginStatus : BehaviorSubject<any> = new BehaviorSubject(this.status)

  //recieve status from login component
  setLoginStatus(status){
    
    this.loginStatus.next(status)
  }

  //send status of login 
  getLoginStatus():Observable<any>{
    return this.loginStatus.asObservable()
  }

  //Username
  private uname : string = null

  //create object to BehaviorSubject with initial value
  private userName : BehaviorSubject<any> = new BehaviorSubject(this.uname)

  //recieve username
  setUsername(username){
    
    this.userName.next(username)
  }

  //send username
  getUsername():Observable<any>{
    return this.userName.asObservable()
  }


  //userType 
  private type : string = null

  //create object to BehaviorSubject with initial value
  private userType : BehaviorSubject<any> = new BehaviorSubject(this.type)

 //set usertype
 setUserType(usertype){
  
   this.userType.next(usertype)
 }

 //get usertype
 getUserType():Observable<any>{
    return this.userType.asObservable()
 }


 logOutService(){
   localStorage.clear()

    this.setLoginStatus(false)
    this.setUsername(null)
    this.setUserType(null)
     
     //navigate to login
     this.router.navigateByUrl("/login")

  }

}
