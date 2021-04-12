import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage.service';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private ms : MovieserviceService,private toastr : ToastrService,
              private router:Router,private ls : LocalStorageService) { }

  moviesArray = [];
  telugumovies = [];
  hindimovies = [];
  englishmovies = [];

  moviesList=[]
  searchTerm;

  ngOnInit(): void {
    
    this.ms.getmovieslist().subscribe(
      res=>{

        if(res['message'] == 'failed'){
          
          //clear local storage
          this.ls.logOutService()

           this.toastr.warning(res['reason'])
         
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
        alert("Something went wrong")
        console.log(err)
      }
    )

    
  }


  description(moviename,language){
    
     //navigate to description
     this.router.navigateByUrl(`/userdashboard/${localStorage.getItem("username")}/description/${language}/${moviename}`)

  }

}
