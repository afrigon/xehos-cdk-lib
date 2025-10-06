import { Stack } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
export class OpenIdConnectProvider extends iam.OpenIdConnectProvider {
    constructor(scope, id) {
        super(scope, id, {
            url: "https://token.actions.githubusercontent.com",
            clientIds: ["sts.amazonaws.com"]
        });
    }
    static fromRefs(scope, id) {
        const arn = Stack.of(scope).formatArn({
            service: "iam",
            resource: "oidc-provider",
            resourceName: "token.actions.githubusercontent.com"
        });
        return OpenIdConnectProvider.fromOpenIdConnectProviderArn(scope, id, arn);
    }
}
