import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { MlPipeline } from '../../models/ml-pipeline';
import { MlModel } from '../../models/ml-model';

import { PipelineService } from '../../services/manager.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-ml-pipeline-full',
  templateUrl: './ml-pipeline-full.component.html',
  styleUrls: []
})
export class MlPipelineFullComponent implements OnInit {
  pipeline: MlPipeline;
  servingInProcess = false;
  inputSettings: any;
  inputData: any[] = [];

  outputSettings: any;
  outputData: LocalDataSource = new LocalDataSource();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pipelineService: PipelineService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params) => this.pipelineService.getPipeline(params['name']))
      .subscribe( (pipeline: MlPipeline) => {
        this.pipeline = pipeline;
        console.log(`Current pipeline: ${this.pipeline}`)
        this.setupTables();
      });
  }

  executePipeline() {
    this.servingInProcess = true;
    const outputs = this.pipeline.getOutputs();
    this.pipelineService.executePipeline(this.pipeline, this.inputData).subscribe(
      (data) => {
        console.log(`RESULT: ${data}`);
        const output = data.map((row) => {
          const res = {};
          outputs.forEach((column) => {
            if (row.hasOwnProperty(column)) {
              res[column] = row[column]
            }
          })
          return res;
        });
        this.servingInProcess = false;
        this.outputData.load(output);
      },
      err => {
        this.servingInProcess = false;
        console.error(err);
      }
    );
  }

  private setupTables() {
    this.inputSettings = this.settingsForColumns(this.pipeline.getInputs());
    this.outputSettings = this.settingsForColumns(this.pipeline.getOutputs());
  }

  private settingsForColumns(columns: string[]) {
    const columnObjs = {};
    columns.forEach(function (i) {
      const inner = {};
      inner['title'] = i;
      columnObjs[i] = inner;
    });
    return { columns: columnObjs };
  }
}
