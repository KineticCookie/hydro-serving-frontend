import { Route } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { PipelineManagerComponent } from './components/pipeline-manager/pipeline-manager.component';
import { PipelineBuilderComponent } from './components/pipeline-builder/pipeline-builder.component';
import { MlPipelineFullComponent } from './components/ml-pipeline/ml-pipeline-full.component';
export const ROUTES: Route[] = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'repository',
        component: RepositoryComponent
    },
    {
        path: 'pipelines',
        component: PipelineManagerComponent
    },
    {
        path: 'build',
        component: PipelineBuilderComponent
    },
    {
        path: 'pipeline/:name',
        component: MlPipelineFullComponent
    }
]
