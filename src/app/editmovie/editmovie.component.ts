import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminserviceService } from '../adminservice.service';
import { LocalStorageService } from '../local-storage.service';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent implements OnInit {

  
 moviename : string
  movieObj :any
  constructor(private ar:ActivatedRoute,private as : AdminserviceService,private ms:MovieserviceService,
              private router:Router,private toastr :ToastrService,private ls:LocalStorageService) { }

  ngOnInit(): void {

    this.ar.params.subscribe(
      res =>{
       
        this.moviename = res.moviename
        
        let movie = {moviename : this.moviename,language:res.language}
        this.ms.getMovieByName(movie).subscribe(
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

  save(ref){
    
    //console.log(ref.value)

    let movieObj = ref.value
 
    let movie = {moviename : this.moviename,movie : movieObj}
    
    this.as.updateMovieByName(movie).subscribe(
        res=>{
           
          if(res['message'] == "failed"){
            
            //clear localstorage
            this.ls.logOutService()

            this.toastr.warning(res['reason'])

            //navigate to login
            this.router.navigateByUrl("/login")
          }
          else{
            
            if(res['message'] == "Updated Successfully..."){
              
              this.toastr.success(res['message'])
              
              //navigate to movieslist
               this.router.navigateByUrl(`/admindashboard/${localStorage.getItem("username")}/movieslist`)

            }
            else{
              this.toastr.error("something went wrong..")
            }
            
          }
        },
        err=>{
          this.toastr.error("Something went wrong")
          console.log(err)
        }
    )
  }

 
}
