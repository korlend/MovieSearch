import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FullDataResponse } from '@app/core/models/OMBDAPI/fullDataResponse';
import { ShortDataResponse } from '@app/core/models/OMBDAPI/shortDataResponse';

@Component({
    selector: 'movie-container',
    templateUrl: './movieContainer.component.html',
    styleUrls: ['./movieContainer.component.scss']
})
export class MovieContainerComponent implements OnInit {

    @Input()
    shortMovie: ShortDataResponse;

    @Input()
    fullMovie: FullDataResponse;

    @Input()
    movieClicked: EventEmitter<ShortDataResponse>;

    title: string;
    year: string;

    constructor() { }

    ngOnInit(): void {
        if (this.shortMovie) {
            this.title = this.shortMovie.Title;
            this.year = this.shortMovie.Year;
        } else if (this.fullMovie) {
            this.title = this.fullMovie.Title;
            this.year = this.fullMovie.Year;
        } else {
            this.title = 'Error while loading movie info...';
            this.year = 'Sorry';
        }
    }

    openMovie() {
        if (this.movieClicked && this.shortMovie) {
            this.movieClicked.emit(this.shortMovie);
        }
    }
}
