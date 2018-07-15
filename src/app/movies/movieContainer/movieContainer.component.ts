import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FullDataResponse } from '@app/core/models/OMBDAPI/fullDataResponse';
import { ShortDataResponse } from '@app/core/models/OMBDAPI/shortDataResponse';
import { OMDBAPIService } from '@app/core/services/OMDBAPI.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'movie-container',
    templateUrl: './movieContainer.component.html',
    styleUrls: ['./movieContainer.component.scss']
})
export class MovieContainerComponent implements OnInit {

    @Input()
    shortMovie: ShortDataResponse; // used for search data output
    @Input()
    extComp = false; // if true, then it uses fullMovie, which is loaded itself by this component

    @Output()
    movieClicked: EventEmitter<ShortDataResponse> = new EventEmitter<ShortDataResponse>(); // used to emit tab creation

    fullMovie: FullDataResponse; // used to view full data in separate tab

    title: string;
    year: string;

    constructor(private ombdApiService: OMDBAPIService) { }

    ngOnInit(): void {
        if (this.shortMovie) {
            this.title = this.shortMovie.Title;
            this.year = this.shortMovie.Year;
        } else {
            this.title = 'Error while loading movie info...';
            this.year = 'Sorry';
        }
        this.loadFullMovieInfo();
    }

    loadFullMovieInfo() {
        if (!this.extComp) {
            return;
        }
        console.log(this.shortMovie);
        this.ombdApiService.searchById(this.shortMovie.imdbID).subscribe((r: FullDataResponse) => {
            this.fullMovie = r;
            console.log(r);
        });
    }

    openMovie() {
        if (!this.extComp && this.movieClicked && this.shortMovie) {
            this.movieClicked.emit(this.shortMovie);
        }
    }
}
