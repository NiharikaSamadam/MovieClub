import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminserviceService } from '../adminservice.service';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  formData: any;
  
  
  constructor(private as:AdminserviceService,private router : Router,
               private toastr:ToastrService,private ls: LocalStorageService) { }
  
  languages = ["Telugu","Hindi","English"]



  ngOnInit(): void {
    
  }
  
 
  file:File
  
  incomingfile(event){
     
   this.file = event.target.files[0]
   
  }

  
 

  upload(ref){
  
    let movieObj = ref.value
     delete movieObj.photo

     let genres = movieObj.genres.split(", ")
     
     movieObj.genres = genres
     
     let formData = new FormData()
     formData.append("image",this.file,this.file.name)
     formData.append("movieObj",JSON.stringify(movieObj))
     
     
     this.as.addMovie(formData).subscribe(
       res=>{
        if(res['message'] == "failed"){
          
        //clear local storage
         this.ls.logOutService()

          this.toastr.warning(res['reason'])
          //navigate to login
          this.router.navigateByUrl("/login")
        }
         

         else{
          
          if(res['message'] == "Movie added successfully"){
          
            this.toastr.success(res['message'])
            //navigate to movieslist
            this.router.navigateByUrl(`/admindashboard/${localStorage.getItem("username")}/movieslist`)
          }
          else{
           ref.form.reset()
            this.toastr.warning(res['message'])
            
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
