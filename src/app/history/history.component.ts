import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage.service';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyArray = []

  constructor(private ls : LocalStorageService,private ms : MovieserviceService,private router : Router,
              private toastr : ToastrService) { }

  ngOnInit(): void {
    this.ms.getMoviesFromHistory().subscribe(
      res => {
        if(res['message'] == "failed"){

          //clear localstoarge
          this.ls.logOutService()

          this.toastr.warning(res['reason'])

          //navigate to login
          this.router.navigateByUrl("/login")
        }

        else{
              
          this.historyArray = res['history']
          
        }
      },
      err => {
        this.toastr.error("Error in retrieving movies")
        console.log(err)
      }
    )
  }

  removeFromHistory(history){

    let movieObj = {username : localStorage.getItem("username"),moviename : history.moviename,language : history.language}
   console.log(movieObj)
    this.ms.deleteMovieFromHistory(movieObj).subscribe(
      res => {
        if(res['message'] == 'failed'){

          //clear localstorage
          this.ls.logOutService()

          this.toastr.warning(res['reason'])

        }
        else{
            
          if(res['message'] == "movie deleted successfully"){
            this.toastr.success("Movie deleted from history...")
            this.historyArray = res['newArray']
          }
        }
      },
      err => {
          this.toastr.error("Error in removing movie from history")
          console.log(err)
      }
    )
  }

  description(moviename,language){

    //navigate to description page
    this.router.navigateByUrl(`/userdashboard/${localStorage.getItem("username")}/description/${language}/${moviename}`)

  }


}
