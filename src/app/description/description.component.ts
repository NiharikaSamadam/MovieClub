import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage.service';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor(private ar:ActivatedRoute, private ls:LocalStorageService,
               private ms : MovieserviceService,private toastr : ToastrService,private router : Router) { }

  movieObj : any
  moviename:string
  language : string

  ngOnInit(): void {
    this.ar.params.subscribe(
      res =>{
       
        this.moviename = res.moviename
        this.language = res.language
        
        let movieObj = {moviename: this.moviename,language : this.language}

        this.ms.getMovieByName(movieObj).subscribe(
          data =>{
             
            if(data['message'] == "failed"){
              
              //clear localstorage
              this.ls.logOutService()

              this.toastr.warning(data['reason'])

              //navigate to login
              this.router.navigateByUrl("/login")
            }
           else{
                this.movieObj = data['message']
                console.log(this.movieObj)
           }
          }
        )
        
      },
      err =>{
       this.toastr.error("Something went wrong")
        console.log(err)
      }
    )
  }

  watchNow(movieObj){
     
    //navigate to watch now 
    if(localStorage.getItem("usertype") == "user"){
    this.router.navigateByUrl(`/userdashboard/${localStorage.getItem("username")}/watchnow/${this.language}/${this.moviename}`)

    
    let movie = {moviename : movieObj.moviename,language:this.language}
    this.ms.addtoHistory(movie).subscribe(
      res => {
        if(res['message'] == "failed"){

          //clear localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])

          //navigate to login
          this.router.navigateByUrl("/login")
        }
      },
      err => {
        this.toastr.error("Error in adding to history")
        console.log(err)
      }
    )
    }
    if(localStorage.getItem("usertype") == "admin"){
      this.router.navigateByUrl(`/admindashboard/${localStorage.getItem("username")}/watchnow/${this.language}/${this.moviename}`)
    }
  }

  watchlist(movieObj){

    
    let movie = {moviename : movieObj.moviename,language:this.language}
    
    if(localStorage.getItem("usertype") == "user"){
    this.ms.addtoWatchlist(movie).subscribe(
      res => {
        if(res['message'] == "failed"){
          //clear localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])

          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
          
         if(res['message'] == "Movie added to watchlist...."){
           this.toastr.success(res['message'])
         }

         else{
           this.toastr.info(res['message'])
         }
        }
      },
      err => {
        this.toastr.error("Failed in add to watchlist")
        console.log(err)
      }
    )
  }
 }

 favourites(movieObj){

  
  let movie = {moviename : movieObj.moviename,language:this.language}

    if(localStorage.getItem("usertype") == "user"){
    this.ms.addtoFavourites(movie).subscribe(
      res => {
        if(res['message'] == "failed"){
          //clear localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])

          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
          
         if(res['message'] == "Added to favourites.."){
           this.toastr.success(res['message'])
         }

         else{
           this.toastr.info(res['message'])
         }
        }
      },
      err => {
        this.toastr.error("Failed in add to watchlist")
        console.log(err)
      }
    )
  }

 }

}
