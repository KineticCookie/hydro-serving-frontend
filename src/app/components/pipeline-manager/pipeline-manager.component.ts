import { Component, OnInit } from '@angular/core';
import { MlPipeline } from '../../models/ml-pipeline';
import { PipelineService } from '../../services/manager.service';

@Component({
    selector: 'app-pipeline-manager',
    templateUrl: './pipeline-manager.component.html',
    styleUrls: []
})
export class PipelineManagerComponent implements OnInit {
    pipelines: MlPipeline[];

    constructor(private managerService: PipelineService) { }

    ngOnInit(): void {
        this.managerService.getPipelines()
            .subscribe(
            res => this.pipelines = res,
            err => console.error(`Couldn't get pipelines. Reason:${err}`)
            )
    }
}
