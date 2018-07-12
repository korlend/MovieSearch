import { AppComponent } from '@app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from '@app/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatGridListModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { ErrorPageComponent } from '@app/errorPage/errorPage.component';
import { AboutComponent } from '@app/about/about.component';
import { MoviesComponent } from '@app/movies/movies.component';
import { OMDBAPIService } from '@app/core/services/OMDBAPI.service';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MovieContainerComponent } from '@app/movies/movieContainer/movieContainer.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


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
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatGridListModule,
    BrowserModule,
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'b2bcashlimited',
      storageType: 'localStorage'
    }),
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
    OMDBAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
