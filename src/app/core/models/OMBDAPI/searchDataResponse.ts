import { ShortDataResponse } from "@app/core/models/OMBDAPI/shortDataResponse";


export class SearchDataResponse {
    Search: Array<ShortDataResponse>;
    totalResults: string;
    Response: string;
}