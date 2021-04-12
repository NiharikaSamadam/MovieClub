import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage.service';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  opened : boolean =false

  search;
  moviesArray = []
  genres = ["Action","Comedy","Drama","International","Romance","Suspence"]
  constructor(private router:Router,private ls : LocalStorageService,private ms:MovieserviceService,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.ms.getmovieslist().subscribe(
      res=>{

        if(res['message'] == 'failed'){
          
          //clear local storage
          this.ls.logOutService()

           this.toastr.warning(res['reason'])
          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
        this.moviesArray = res['message']
        
      }
      },
      err=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
    
 }

  toggleSidebar(){
    this.opened = !this.opened
  }

  searchMovie(){
    
    this.router.navigateByUrl(`/userdashboard/${localStorage.getItem("username")}/search/${this.search}`)
  }

}
