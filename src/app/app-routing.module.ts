import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { DescriptionComponent } from './description/description.component';
import { EditmovieComponent } from './editmovie/editmovie.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesComponent } from './movies/movies.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { WatchnowComponent } from './watchnow/watchnow.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"userdashboard/:username",component:UserdashboardComponent,
    children:[
      {path:"movies",component:MoviesComponent},
      {path:"profile",component:ProfileComponent},
      {path:"description/:language/:moviename",component:DescriptionComponent},
      {path:"watchnow/:language/:moviename",component:WatchnowComponent},
      {path:"watchlist",component:WatchlistComponent},
      {path:"history",component:HistoryComponent},
      {path:"favourites",component:FavouriteComponent},
      {path:"search/:searchby",component:SearchComponent}
    ]},
  {path:"admindashboard/:username",component:AdmindashboardComponent,children:[
    {path:"addmovie",component:AddmovieComponent},
    {path:"movieslist",component:MoviesListComponent},
    {path:"editmovie/:language/:moviename",component:EditmovieComponent},
    {path:"description/:language/:moviename",component:DescriptionComponent},
    {path:"watchnow/:language/:moviename",component:WatchnowComponent}
  ]},
  
  {path:"",redirectTo:"/home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
