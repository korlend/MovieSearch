import { Http } from "@angular/http";
import { Injectable } from '@angular/core';
import { FullDataResponse } from '@app/core/models/OMBDAPI/fullDataResponse';
import { OMDBType } from "@app/core/models/OMBDAPI/enums/type";
import { OMDBReturnType } from "@app/core/models/OMBDAPI/enums/returnType";
import { OMDBPlot } from "@app/core/models/OMBDAPI/enums/plot";
import { SearchDataResponse } from "@app/core/models/OMBDAPI/searchDataResponse";
import { LocalStorageService } from 'angular-2-local-storage';
import { SearchDataRequest } from "@app/core/models/OMBDAPI/searchDataRequest";

@Injectable()
export class OMDBAPIService {
    private url: string = 'http://www.omdbapi.com';
    private apiKey: string = '5ff7f61a';

    constructor(private http: Http, private localStorage: LocalStorageService) {

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

    searchById(id: string, type?: OMDBType, year?: string, plot?: OMDBPlot, returnType?: OMDBReturnType): Promise<FullDataResponse> {
        const obj = { i: id, type: type, y: year, plot: plot, r: returnType };
        return this.http.get(this.formatUrl(obj))
            .toPromise()
            .then((response) => response.json())
            .catch((error) => { console.log(error) });
    }

    searchByTitle(title: string, type?: OMDBType, year?: string, plot?: OMDBPlot, returnType?: OMDBReturnType): Promise<FullDataResponse> {
        const obj = { t: title, type: type, y: year, plot: plot, r: returnType };
        return this.http.get(this.formatUrl(obj))
            .toPromise()
            .then((response) => response.json())
            .catch((error) => { console.log(error) });
    }

    search(obj: SearchDataRequest): Promise<SearchDataResponse> {
        return this.http.get(this.formatUrl(obj))
            .toPromise()
            .then((response) => response.json())
            .catch((error) => { console.log(error) });
    }
}