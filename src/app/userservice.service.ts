import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private hc : HttpClient) { }


  createUser(user):Observable<any>{
    return this.hc.post('/user/createuser',user)
 }

 loginUser(credObj):Observable<any>{
   return this.hc.post("/user/loginuser",credObj)
 }

 getUser(username):Observable<any>{
   return this.hc.get(`/user/getuser/${username}`)
 }
}
