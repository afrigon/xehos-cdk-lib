import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApplicationContext } from "./context.js";
export interface BaseStackProps extends StackProps {
    context: ApplicationContext;
}
export declare class BaseStack extends Stack {
    context: ApplicationContext;
    constructor(scope: Construct, id: string, props: BaseStackProps);
}
//# sourceMappingURL=base.d.ts.map