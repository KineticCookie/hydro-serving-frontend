import { Component, Input } from '@angular/core';

import { MlPipeline } from '../../models/ml-pipeline';
import { MlModel } from '../../models/ml-model';

@Component({
  selector: 'app-ml-pipeline-compact',
  templateUrl: './ml-pipeline-compact.component.html',
  styleUrls: []
})
export class MlPipelineCompactComponent {
    @Input() pipeline: MlPipeline;
    constructor() { }
}
