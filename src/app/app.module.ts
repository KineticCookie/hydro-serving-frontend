import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { MlModelComponent } from './components/ml-model/ml-model.component';
import { PipelineManagerComponent } from './components/pipeline-manager/pipeline-manager.component';
import { PipelineBuilderComponent } from './components/pipeline-builder/pipeline-builder.component';
import { MlPipelineFullComponent } from './components/ml-pipeline/ml-pipeline-full.component';
import { MlPipelineCompactComponent } from './components/ml-pipeline/ml-pipeline-compact.component';


import { RepositoryService } from './services/repository.service';
import { PipelineService, RuntimeService } from './services/manager.service';

import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepositoryComponent,
    MlModelComponent,
    PipelineManagerComponent,
    PipelineBuilderComponent,
    MlPipelineFullComponent,
    MlPipelineCompactComponent
  ],
  imports: [
    Ng2SmartTableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterializeModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    RepositoryService,
    PipelineService,
    RuntimeService
  ],
  bootstrap: [
    AppComponent
    ]
})
export class AppModule { }
