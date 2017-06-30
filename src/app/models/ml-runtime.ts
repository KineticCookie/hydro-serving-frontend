export class MlRuntime {
    hostIp: string;
    ip: string;
    sideCarAdminPort: number;
    sideCarGrpcPort: number;
    sideCarHttpPort: number;
    serviceHttpPort: number;
    serviceGrpcPort: number;
    serviceName: string;
    serviceVersion: string;
    serviceId: string;
    serviceUUID: string;
    serviceType: string;
    useServiceHttp: boolean;
    useServiceGrpc: boolean;
    lastKnownStatus: string;

    toString(): string {
        return `${this.serviceType}-${this.serviceName}`
    }
}
