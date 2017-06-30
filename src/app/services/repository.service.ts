import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { MlModel } from '../models/ml-model';
import { Observable } from 'rxjs/Observable';
import { HttpUtils } from '../util/http'
import { ArrayUtils } from '../util/array'
import { Chain } from '../models/chain';
import { environment } from '../../environments/environment'

@Injectable()
export class RepositoryService {
    constructor(private http: Http) { }

    public getModels(): Observable<MlModel[]> {
        const apiUrl = `${environment.repositoryUrl}/index`
        return this.http.get(apiUrl).map(HttpUtils.extractAsIs)._catch(HttpUtils.handleError)
    }
}
