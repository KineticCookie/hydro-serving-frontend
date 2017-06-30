import { MlModel } from './ml-model';
import { ArrayUtils } from '../util/array'

export class MlPipeline {
    name: string;
    stages: MlModel[];
    allIns: string[];
    allOuts: string[];

    constructor(name: string, stages: MlModel[]) {
        this.name = name;
        this.stages = stages;
        this.allIns = ArrayUtils.flatMap(this.stages, x => x.inputs);
        this.allOuts = ArrayUtils.flatMap(this.stages, x => x.outputs);
    }

    getInputs() {
        return ArrayUtils.diff(this.allIns, this.allOuts);
    }

    getOutputs() {
        return ArrayUtils.diff(this.allOuts, this.allIns);
    }
}
