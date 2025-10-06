import { Construct } from "constructs";
export declare enum Environment {
    DEVELOPMENT = "dev",
    STAGING = "stage",
    PRODUCTION = "prod"
}
export declare class ApplicationContext {
    readonly application: string;
    readonly environment?: string;
    readonly component?: string;
    constructor(application: string, environment?: string, component?: string);
    withComponent(component: string): ApplicationContext;
    identifier(...components: string[]): string;
    static of(scope: Construct): ApplicationContext;
}
//# sourceMappingURL=context.d.ts.map