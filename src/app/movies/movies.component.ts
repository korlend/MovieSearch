import { Component, OnInit, EventEmitter } from '@angular/core';
import { OMDBAPIService } from '@app/core/services/OMDBAPI.service';
import { OMDBType } from '@app/core/models/OMBDAPI/enums/type';
import { SearchDataResponse } from '@app/core/models/OMBDAPI/searchDataResponse';
import { SearchDataRequest } from '@app/core/models/OMBDAPI/searchDataRequest';
import { ShortDataResponse } from '@app/core/models/OMBDAPI/shortDataResponse';
import { NgRedux, select } from '@angular-redux/store';
import { IMoviesState } from '@app/core/store/movies/movies.store';
import { MoviesActions } from '@app/core/store/movies/movies.actions';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material';

enum ViewType {
    list, grid
}

class OpenedMovie {

    _loading = false;

    shortData: ShortDataResponse;

    constructor(shortData: ShortDataResponse, loading = false) {
        this.shortData = shortData;
        this._loading = loading;
    }
}

@Component({
    selector: 'movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {

    OMDBTypeList = new Array<string>();

    viewType: ViewType = ViewType.grid; // TODO: implement different search output methods

    @select('movies') readonly openedMovies: Observable<Array<OpenedMovie>>; //
    movieClosed = new EventEmitter<void>();

    simpleSearchObject: SearchDataRequest = new SearchDataRequest();
    years: Array<number> = (() => { return Array.from<number>({ length: new Date().getFullYear() + 1 }, ).map((v, i) => v = i).reverse().splice(0, 150); })();

    currentPage = '1';
    lastSearch: SearchDataResponse;

    searchInputControl = new FormControl();
    filteredOptions: Array<ShortDataResponse>;

    // temporary commented, till decision to make delay on search
    // _searchTimeoutLasting = 500; // millisecond wait to activate movies search (after typing)
    // _searchTimeout;

    constructor(
        private ombdApiService: OMDBAPIService,
        private ngRedux: NgRedux<IMoviesState>,
        private actions: MoviesActions) {
        for (const key in OMDBType) {
            if (OMDBType.hasOwnProperty(key)) {
                this.OMDBTypeList.push(key);
            }
        }
    }

    ngOnInit() {
        this.searchInputControl.valueChanges.subscribe((searchStr) => {
            this._filterMovies(searchStr);
        });
    }

    private _filterMovies(searchStr: string) {
        this.simpleSearchObject.s = searchStr;
        this.ombdApiService.search(this.simpleSearchObject)
            .toPromise()
            .then((data: SearchDataResponse) => {
                this.filteredOptions = data.Search;
            });
    }

    paginatorChanged(pageData: PageEvent) {
        this.simpleSearchObject.page = pageData.pageIndex + 1 + '';
        this.searchMovies();
    }

    openMovieInTab(shortData: ShortDataResponse) {
        this.ngRedux.dispatch(this.actions.insert(shortData));
    }

    closeMovieTab(shortData: ShortDataResponse) {
        this.ngRedux.dispatch(this.actions.delete(shortData));
    }

    searchMovies() {
        this.ombdApiService.search(this.simpleSearchObject).toPromise()
            .then((data: SearchDataResponse) => {
                this.lastSearch = data;
            });
    }
}
