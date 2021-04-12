import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage.service';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private ar:ActivatedRoute,private toastr : ToastrService,private router:Router,private ls : LocalStorageService,private ms:MovieserviceService) { }
  moviesArray = []
  search : string
  ngOnInit(): void {

    this.ar.params.subscribe(
      res => {
        this.search = res.searchby
        console.log(res.searchby)
        this.ms.getMovie(res.searchby).subscribe(
          data => {
            if(res['message'] == "failed")
            {
              this.ls.logOutService()
              this.toastr.warning(res['reason'])
              this.router.navigateByUrl("/login")
            }
            else{
              this.moviesArray = data['message']
              console.log(this.moviesArray)
            }
          }
        )
      },
      err =>{
        this.toastr.error("Error in retrieving data")
        console.log(err)
      }
    )
  }

  description(moviename,language){
    this.router.navigateByUrl(`/userdashboard/${localStorage.getItem("username")}/description/${language}/${moviename}`)
  }
}
