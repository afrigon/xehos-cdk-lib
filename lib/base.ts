import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { ApplicationContext } from "./context.js"

export interface BaseStackProps extends StackProps {
    context: ApplicationContext
}

export class BaseStack extends Stack {
    context: ApplicationContext

    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);

        (BaseStack.of(scope) as BaseStack).context.identifier()

        this.context = props.context
    }
}
