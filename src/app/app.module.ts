import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddmovieComponent } from './addmovie/addmovie.component'
import { AuthorisationService } from './authorisation.service';
import { MoviesComponent } from './movies/movies.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { SidebarModule } from 'ng-sidebar';
import { EditmovieComponent } from './editmovie/editmovie.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ToastrModule} from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { DescriptionComponent } from './description/description.component';
import { WatchnowComponent } from './watchnow/watchnow.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { HistoryComponent } from './history/history.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    FooterComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    AddmovieComponent,
    MoviesComponent,
    MoviesListComponent,
    EditmovieComponent,
    ProfileComponent,
    DescriptionComponent,
    WatchnowComponent,
    WatchlistComponent,
    HistoryComponent,
    FavouriteComponent,
    SearchComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton:true,
      timeOut : 1000,
      progressBar : true,
      progressAnimation:'increasing',
      preventDuplicates:true,
      positionClass:'toast-top-center'
    })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorisationService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
