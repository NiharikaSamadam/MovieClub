import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {

  constructor(private hc:HttpClient) { }

  getmovieslist():Observable<any>{
    return this.hc.get("/movie/getallmovies");
  }

  getMovieByName(movie):Observable<any>{
    return this.hc.post(`/movie/getmoviebyname`,movie)
  }

  addtoWatchlist(movie):Observable<any>{
    
    return this.hc.put(`/user/addtowatchlist/${localStorage.getItem("username")}`,movie)
  }

  getMoviesFromWatchlist():Observable<any>{
     return this.hc.get(`/user/getmovies/${localStorage.getItem("username")}`)
  }

  deleteMovieFromWatchlist(movieObj):Observable<any>{
  
    return this.hc.post('/user/deletefromwatchlist',movieObj)
  }

  addtoHistory(movie):Observable<any>{
    return this.hc.put(`/user/addtohistory/${localStorage.getItem("username")}`,movie)
  }

  getMoviesFromHistory():Observable<any>{
    return this.hc.get(`/user/getmoviesfromhistory/${localStorage.getItem("username")}`)
  }

  deleteMovieFromHistory(movieObj):Observable<any>{
    
    return this.hc.post(`/user/deletefromhistory`,movieObj)
  }

  addtoFavourites(movie):Observable<any>{
    
    return this.hc.put(`/user/addtofavourites/${localStorage.getItem("username")}`,movie)
  }

  getMoviesFromFavourites():Observable<any>{
    return this.hc.get(`/user/getfavourites/${localStorage.getItem("username")}`)
  }

  deletemovieFromFavourites(movie):Observable<any>{
    return this.hc.put(`/user/deletefavourites/${localStorage.getItem("username")}`,movie)
  }

  getMovie(search):Observable<any>{
    return this.hc.get(`/movie/getmovie/${search}`)
  }
}
