import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private hc:HttpClient) { }

  // Admin Login 
  loginAdmin(credObj):Observable<any>{
    return this.hc.post('/admin/loginadmin',credObj)
  }

  // Add Movie
  addMovie(movieObj):Observable<any>{
    return this.hc.post("/movie/createmovie",movieObj)
  }

  deleteMovie(movieObj):Observable<any>{
    return this.hc.post(`/movie/deletemovie`,movieObj)
  }

  updateMovieByName(movieObj):Observable<any>{
    
    return this.hc.put(`/movie/updatemovie/${movieObj.moviename}`,movieObj.movie)
  }
}
