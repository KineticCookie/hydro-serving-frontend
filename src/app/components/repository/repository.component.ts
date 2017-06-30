import { Component, OnInit } from '@angular/core';

import { MlModelComponent } from '../ml-model/ml-model.component';

import { MlModel } from '../../models/ml-model';

import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: []
})
export class RepositoryComponent implements OnInit {
  models: MlModel[];

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.getModels();
  }

  getModels() {
    this.repositoryService.getModels()
    .subscribe(
      res => this.models = res,
      err => console.error(`Couldn't get models. Reason:${err}`)
    )
  }
}
