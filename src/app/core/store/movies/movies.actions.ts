import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { ShortDataResponse } from '@app/core/models/OMBDAPI/shortDataResponse';

export class MoviesAction implements Action {
    type: string;
    movie: ShortDataResponse;

    constructor(type: string, movie: ShortDataResponse) {
        this.type = type;
        this.movie = movie;
    }
}

@Injectable()
export class MoviesActions {
    static INSERT = 'INSERT';
    static DELETE = 'DELETE';

    insert(movie: ShortDataResponse): MoviesAction {
        return {type: MoviesActions.INSERT, movie: movie};
    }

    delete(movie: ShortDataResponse): MoviesAction {
        return {type: MoviesActions.DELETE, movie: movie};
    }
}