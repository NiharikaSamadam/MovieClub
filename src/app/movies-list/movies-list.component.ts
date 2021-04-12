import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminserviceService } from '../adminservice.service';
import { LocalStorageService } from '../local-storage.service';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

   moviesArray = [];
   
   telugumovies = [];
   hindimovies = [];
   englishmovies = [];
   username1 :string
   username:string;
  constructor(private as:AdminserviceService,private ms:MovieserviceService,private ls : LocalStorageService,
              private router:Router,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username")
   
    this.ms.getmovieslist().subscribe(
      res =>{

        let loginStatus : boolean = false
        if(res['message'] == "failed"){
          
         //claer the localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])
          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{

          this.moviesArray = res['message']
          
          for(let i of this.moviesArray){
            if(i.language == 'Telugu'){
  
              //add telugu movies to telugumovies array
              this.telugumovies.push(i)
            }
  
            if(i.language == 'Hindi'){
  
              //add telugu movies to telugumovies array
              this.hindimovies.push(i)
            }
  
            if(i.language == 'English'){
  
              //add telugu movies to telugumovies array
              this.englishmovies.push(i)
            }
            
          }
        }  
      },
      err=>{

        this.toastr.error("Something went wrong")
        console.log(err)
      }
    )
  }

  deleteMovie(movie,ind){

    let movieObj = {moviename:movie.moviename,language:movie.language}
    
    this.as.deleteMovie(movieObj).subscribe(
      res=>{
           if(res['message'] == 'Movie deleted successfully'){

            this.toastr.success(res['message'])
            
            if(movie.language == 'Telugu'){
               this.telugumovies.splice(ind,1)
            }

            if(movie.language == 'Hindi'){
               this.hindimovies.splice(ind,1)
            }

            if(movie.language == 'English'){
               this.englishmovies.splice(ind,1)
            }
            
           }
           else{
             
            this.toastr.warning(res['reason'])
             localStorage.clear()
            
             //navigate to login
             this.router.navigateByUrl("/login")
           }
      },
      err=>{
        this.toastr.error("Somthing went wrong")
        console.log(err)
      }
    )
  }


  editmovie(moviename,language){
   
    //navigate to editmovie
    this.router.navigateByUrl(`/admindashboard/${localStorage.getItem("username")}/editmovie/${language}/${moviename}`)

  }

  description(moviename,language){
    //navigate to description
    this.router.navigateByUrl(`/admindashboard/${localStorage.getItem("username")}/description/${language}/${moviename}`)
  }
}
