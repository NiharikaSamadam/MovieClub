
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage.service';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  favouritesArray = []
  constructor(private ms : MovieserviceService,private ls:LocalStorageService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.ms.getMoviesFromFavourites().subscribe(
      res => {
        if(res['message'] == "failed"){
           
          //clear localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])

          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
          
          this.favouritesArray = res['favourites']
          
        }
      },
      err => {
        this.toastr.error("Error in retrieving movies from favourites")
        console.log(err)
      }
    )
  }

  removeFromFavourites(movie){

    let movieObj = {moviename : movie.moviename,language:movie.language}
    this.ms.deletemovieFromFavourites(movieObj).subscribe(
      res => {
        if(res['message'] == "failed"){
           
          //clear localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])

          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
          if(res['message'] == "Removed from favourites.."){
            
            this.toastr.success(res['message'])
            this.favouritesArray = res['favourites']
            
          }
          
        }
      },
      err => {
        this.toastr.error("Error in retrieving movies from favourites")
        console.log(err)
      }
    )

  }

  description(moviename,language){
    this.router.navigateByUrl(`/userdashboard/${localStorage.getItem("username")}/description/${language}/${moviename}`)
  }
}
