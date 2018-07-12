import { Component, OnInit, EventEmitter } from '@angular/core';
import { OMDBAPIService } from '@app/core/services/OMDBAPI.service';
import { OMDBType } from '@app/core/models/OMBDAPI/enums/type';
import { SearchDataResponse } from '@app/core/models/OMBDAPI/searchDataResponse';
import { SearchDataRequest } from '@app/core/models/OMBDAPI/searchDataRequest';
import { ShortDataResponse } from '@app/core/models/OMBDAPI/shortDataResponse';
import { FullDataResponse } from '@app/core/models/OMBDAPI/fullDataResponse';

enum ViewType {
    list, grid
}

class OpenedMovie {

    _loading = false;

    shortData: ShortDataResponse;
    fullData: FullDataResponse;

    constructor(shortData: ShortDataResponse, loading = false) {
        this.shortData = shortData;
        this._loading = loading;
    }
}

@Component({
    selector: 'movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

    OMDBTypeList = new Array<string>();

    viewType: ViewType = ViewType.grid;
    openedMovies: Array<OpenedMovie> = [];
    movieClicked = new EventEmitter<ShortDataResponse>();
    movieClosed = new EventEmitter<void>();

    simpleSearchObject: SearchDataRequest = new SearchDataRequest();

    currentPage = '1';
    lastSearch: SearchDataResponse;

    constructor(private ombdApiService: OMDBAPIService) {
        for (const key in OMDBType) {
            if (OMDBType.hasOwnProperty(key)) {
                this.OMDBTypeList.push(key);
            }
        }
        this.movieClicked.subscribe(shortData => this.openMovieInTab(shortData));
    }

    openMovieInTab(shortData: ShortDataResponse) {
        const movie = new OpenedMovie(shortData, true);
        this.openedMovies.push(movie);
        console.log(this.openedMovies);
        this.ombdApiService.searchById(shortData.imdbID).then(r => {
            movie.fullData = r;
            movie._loading = false;
        });
    }

    searchMovies() {
        this.ombdApiService.search(this.simpleSearchObject).then(r => {
            this.lastSearch = r;
        });
    }

    ngOnInit(): void {

    }

}
