import $ from 'jquery';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';
import * as Materialize from 'angular2-materialize';
import { RuntimeService } from '../../services/manager.service';

import { MlRuntime } from '../../models/ml-runtime';
import { MlModel } from '../../models/ml-model';

@Component({
  selector: 'app-ml-model',
  templateUrl: './ml-model.component.html',
  styleUrls: []
})
export class MlModelComponent {
  @Input() model: MlModel;
  run: string;
  @Input() selectRuntime: boolean = false;
  @Input() runtimes: string[];

  @Output() modelChange = new EventEmitter<MlModel>();

  change(newValue) {
      const model = this.model;
      model.attachedRuntime = newValue;
      this.model = model;
      this.modelChange.emit(model);
    }
}
