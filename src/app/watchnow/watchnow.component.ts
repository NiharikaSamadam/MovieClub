import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-watchnow',
  templateUrl: './watchnow.component.html',
  styleUrls: ['./watchnow.component.css']
})
export class WatchnowComponent implements OnInit {

  constructor(private ar:ActivatedRoute,private toastr:ToastrService) { }

  language:string
  ngOnInit(): void {

    this.ar.params.subscribe(
      res => {
         this.language = res.language
         console.log(this.language)
      },
      err => {
         this.toastr.error("Something went wrong")
         console.log(err)
      }
    )
  }

}
