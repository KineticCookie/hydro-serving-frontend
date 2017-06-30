import { Component, OnInit } from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';
import * as Materialize from 'angular2-materialize';

import { MlModel } from '../../models/ml-model';
import { MlRuntime } from '../../models/ml-runtime';
import { MlPipeline } from '../../models/ml-pipeline';

import { RepositoryService } from '../../services/repository.service'
import { PipelineService, RuntimeService } from '../../services/manager.service'

@Component({
    selector: 'app-pipeline-builder',
    templateUrl: './pipeline-builder.component.html',
    styleUrls: []
})
export class PipelineBuilderComponent implements OnInit {
    models: MlModel[];
    pipelineStages: MlModel[] = [];
    pipelineName: string;
    runtimes: string[] = [];

    constructor(
        private runtimeService: RuntimeService,
        private repositoryService: RepositoryService,
        private managerService: PipelineService) { }

    ngOnInit(): void {
        this.repositoryService.getModels()
            .subscribe(
            res => this.models = res,
            err => console.error(`Couldn't get models. Reason:${err}`)
            )
        this.runtimeService.getRuntimes()
            .subscribe(
            res => this.runtimes = res.map(x => `${x.serviceType}-${x.serviceName}`),
            err => console.error(`Couldn't get models. Reason:${err}`)
            )
    }

    onKey(value: string) {
        this.pipelineName = value;
    }

    addToPipeline(event: Event, model: MlModel) {
        Materialize.toast(`Model ${model.name} added`, 2000)
        this.pipelineStages.push(model);
    }

    removeFromPipeline(event: Event, model: MlModel) {
        Materialize.toast(`Model ${model.name} removed`, 2000)
        const idx = this.pipelineStages.indexOf(model);
        if (idx > -1) {
            this.pipelineStages.splice(idx, 1);
        }
    }

    createPipeline() {
        const pipeline = new MlPipeline(this.pipelineName, this.pipelineStages);
        this.managerService.submitPipeline(pipeline).subscribe(
            (pipe) => {
                Materialize.toast(`Pipeline ${pipe.name} created`, 2000)
                this.pipelineName = '';
                this.pipelineStages = [];
            },
            (error) => {
                console.error(error);
                Materialize.toast(`Server error ${error}`, 2000)
            }
        )
    }

    onModelChange(model: MlModel) {
        Materialize.toast(`Model runtime changes: ${model.name}:${model.attachedRuntime}`, 2000)
    }
}
