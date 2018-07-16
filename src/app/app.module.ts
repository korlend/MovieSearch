import { AppComponent } from '@app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from '@app/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatGridListModule, MatSelectModule, MatTabsModule, MatIconModule, MatAutocompleteModule, MatSliderModule, MatPaginatorModule } from '@angular/material';
import { ErrorPageComponent } from '@app/errorPage/errorPage.component';
import { AboutComponent } from '@app/about/about.component';
import { MoviesComponent } from '@app/movies/movies.component';
import { OMDBAPIService } from '@app/core/services/OMDBAPI.service';
import { HttpModule } from '@angular/http';
import { MovieContainerComponent } from '@app/movies/movieContainer/movieContainer.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesActions } from '@app/core/store/movies/movies.actions';
import { IMoviesState, moviesReducer, MOVIES_INITIAL_STATE } from '@app/core/store/movies/movies.store';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    ErrorPageComponent,
    MoviesComponent,
    MovieContainerComponent
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatSliderModule,
    MatGridListModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    BrowserModule,
    HttpModule,
    NgReduxModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AboutComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: '**',
        component: ErrorPageComponent
      }
    ])
  ],
  providers: [
    OMDBAPIService,
    MoviesActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IMoviesState>) {
    ngRedux.configureStore(
      moviesReducer,
      MOVIES_INITIAL_STATE);
  }
}
