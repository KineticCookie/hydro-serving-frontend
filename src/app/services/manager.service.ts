import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers } from '@angular/http';
import { MlPipeline } from '../models/ml-pipeline';
import { MlRuntime } from '../models/ml-runtime';
import { Observable } from 'rxjs/Observable';
import { HttpUtils } from '../util/http'
import { Chain } from '../models/chain';
import { RepositoryService } from './repository.service';
import { environment } from '../../environments/environment'

import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PipelineService {
    constructor(private http: Http, private repositoryService: RepositoryService) { }

    public getPipelines(): Observable<MlPipeline[]> {
        const apiUrl = `${environment.managerUrl}/api/v1/pipelines`;
        return this.http.get(apiUrl)
            .flatMap((res) => {
                const data = HttpUtils.extractAsIs(res) as Chain[];
                return this.chainsToPipelines(data);
            })
            ._catch(HttpUtils.handleError);
    }

    public getPipeline(name: string): Observable<MlPipeline> {
        return this.getPipelines().map((pipelines) => pipelines.find(pipe => pipe.name === name))
    }

    public submitPipeline(pipeline: MlPipeline): Observable<MlPipeline> {
        const apiUrl = `${environment.managerUrl}/api/v1/pipelines`;
        const chain = pipeline.stages.filter(x => x.runtime).map(x => `${x.attachedRuntime.toString()}/${x.name}`)
        const request = {
            name: pipeline.name,
            chain: chain,
            transportType: 'http'
        };
        return this.http.post(apiUrl, request)
            .map(x => pipeline)
            ._catch(HttpUtils.handleError)
    }

    public executePipeline(pipeline: MlPipeline, data: any[]): Observable<any[]> {
        const apiUrl = `${environment.servingUrl}/api/v1/serve/${pipeline.name}`;
        return this.http.post(apiUrl, data)
            .map(HttpUtils.extractAsIs)
            ._catch(HttpUtils.handleError)
    }

    private chainsToPipelines(data: Chain[]): Observable<MlPipeline[]> {
        return this.repositoryService.getModels().map((models) =>
            data.map((chain) => {
                const parsedModels = chain.chain.map((stage) => {
                    const splittedStage = stage.split('/');
                    const modelName = splittedStage[1];
                    const foundModel = models.find((model) => model.name === modelName);
                    foundModel.attachedRuntime = splittedStage[0];
                    return foundModel;
                });
                return new MlPipeline(chain.name, parsedModels);
            })
        );
    }
}

@Injectable()
export class RuntimeService {
    constructor(private http: Http) { }

    public getRuntimes(): Observable<MlRuntime[]> {
        const apiUrl = `${environment.managerUrl}/api/v1/runtime`;
        return this.http.get(apiUrl).map(HttpUtils.extractAsIs)._catch(HttpUtils.handleError)
    }
}
