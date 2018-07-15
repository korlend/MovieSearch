import { Http } from "@angular/http";
import { Injectable } from '@angular/core';
import { FullDataResponse } from '@app/core/models/OMBDAPI/fullDataResponse';
import { OMDBType } from "@app/core/models/OMBDAPI/enums/type";
import { OMDBReturnType } from "@app/core/models/OMBDAPI/enums/returnType";
import { OMDBPlot } from "@app/core/models/OMBDAPI/enums/plot";
import { SearchDataResponse } from "@app/core/models/OMBDAPI/searchDataResponse";
import { SearchDataRequest } from "@app/core/models/OMBDAPI/searchDataRequest";
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class OMDBAPIService {
    private url: string = 'http://www.omdbapi.com';
    private apiKey: string = '5ff7f61a';

    constructor(private http: Http) {

    }

    private handleError(operation: String) {
        return (err: any) => {
            let errMsg = `error in ${operation}() retrieving ${this.url}`;
            console.log(`${errMsg}:`, err)
            if (err instanceof HttpErrorResponse) {
                console.log(`status: ${err.status}, ${err.statusText}`);
            }
            return Observable.throw(errMsg);
        }
    }

    private formatUrl(obj): string {
        let url = this.url + `?apikey=${this.apiKey}`;
        for (let key in obj) {
            if (key && obj.hasOwnProperty(key) && obj[key]) {
                url += `&${key}=${obj[key]}`;
            }
        }
        return url;
    }

    searchById(id: string, type?: OMDBType, year?: string, plot?: OMDBPlot, returnType?: OMDBReturnType): Observable<FullDataResponse> {
        const obj = { i: id, type: type, y: year, plot: plot, r: returnType };
        return this.http.get(this.formatUrl(obj)).pipe(
            map((response) => response.json()),
            catchError(this.handleError('searchById')));
    }

    searchByTitle(title: string, type?: OMDBType, year?: string, plot?: OMDBPlot, returnType?: OMDBReturnType): Observable<FullDataResponse> {
        const obj = { t: title, type: type, y: year, plot: plot, r: returnType };
        return this.http.get(this.formatUrl(obj)).pipe(
            map((response) => response.json()),
            catchError(this.handleError('searchByTitle')));
    }

    search(obj: SearchDataRequest): Observable<SearchDataResponse> {
        return this.http.get(this.formatUrl(obj)).pipe(
            map((response) => response.json()),
            catchError(this.handleError('search')));
    }
}