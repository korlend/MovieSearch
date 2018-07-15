import { MoviesActions, MoviesAction } from '@app/core/store/movies/movies.actions';
import { ShortDataResponse } from '@app/core/models/OMBDAPI/shortDataResponse';
import { ArrayUtils } from '@app/core/utils/array.utils';


export interface IMoviesState {
    movies: Array<ShortDataResponse>
}

export const MOVIES_INITIAL_STATE: IMoviesState = (() => {
    const movies = JSON.parse(localStorage.getItem('selectedMovies'));
    return movies ? movies : { movies: [] };
})();

export function moviesReducer(lastState: IMoviesState, action: MoviesAction): IMoviesState {

    const movies = lastState.movies;
    let result = lastState;
    switch (action.type) {
        case MoviesActions.INSERT:
            if (movies.filter(m => m.imdbID == action.movie.imdbID).length > 0) {
                break;
            }
            result = { movies: [...movies, action.movie] };
            break;
        case MoviesActions.DELETE:
            result = { movies: movies.filter(m => m.imdbID != action.movie.imdbID) };
            break;
    }
    localStorage.setItem('selectedMovies', JSON.stringify(result));
    return result;
}