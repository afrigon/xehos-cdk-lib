import { Stack } from "aws-cdk-lib";
export class BaseStack extends Stack {
    context;
    constructor(scope, id, props) {
        super(scope, id, props);
        this.context = props.context;
    }
}
