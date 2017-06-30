import { MlRuntime } from '../models/ml-runtime';

export class MlModel {
    name: string;
    runtime: string;
    inputs: string[];
    outputs: string[];
    attachedRuntime: string;

    constructor(
        name: string,
        runtime: string,
        inputs: string[],
        outputs: string[],
        attachedRuntime: string = null
    ) {
        this.name = name;
        this.runtime = runtime;
        this.inputs = inputs;
        this.outputs = outputs;
        this.attachedRuntime = attachedRuntime;
    }
}
