import { OMDBType } from "@app/core/models/OMBDAPI/enums/type";
import { OMDBReturnType } from "@app/core/models/OMBDAPI/enums/returnType";


export class SearchDataRequest {
    s: string; //search string
    type: OMDBType = OMDBType.movie; //type of searched movie, API states that 'movie' is default value
    y: string; //year
    r: OMDBReturnType;
    page: string; //from 1 to 100
}