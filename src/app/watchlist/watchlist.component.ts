import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage.service';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  watchlistArray = []

  constructor(private ms:MovieserviceService, private toastr : ToastrService,
              private ls: LocalStorageService,private router:Router) { }

  ngOnInit(): void {
    this.ms.getMoviesFromWatchlist().subscribe(
      res =>{
        if(res['message'] == "failed"){
          //clear localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])

          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
          this.watchlistArray = res['watchList']
          console.log(this.watchlistArray)
        }
      },
      err => {
        this.toastr.error("Error in retrieving data....")
        console.log(err)
      }
    )
  }

  description(moviename,language){
    console.log(moviename,language)
       //navigate to description
       this.router.navigateByUrl(`/userdashboard/${localStorage.getItem("username")}/description/${language}/${moviename}`)
  }


  removeFromWatchlist(watch){

    let deleteMovieObj = {username:localStorage.getItem("username"),moviename:watch.moviename,language:watch.language}
    
    console.log(deleteMovieObj)

    this.ms.deleteMovieFromWatchlist(deleteMovieObj).subscribe(
      res => {
        if(res['message'] == "failed"){

          //clear localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])

          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
          if(res['message'] == "deleted successfully..."){
            this.toastr.success(res['message'])
            this.watchlistArray = res['newArray']
          }
        }
      },
      err => {
        this.toastr.error("Error in deletion")
        console.log(err)
      }
    )
  }
}
