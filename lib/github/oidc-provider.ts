import { Stack } from "aws-cdk-lib"
import { Construct } from "constructs"
import * as iam from "aws-cdk-lib/aws-iam"

export class OpenIdConnectProvider extends Construct {
    provider: iam.OpenIdConnectProvider

    constructor(scope: Construct, id: string) {
        super(scope, id)

        this.provider = new iam.OpenIdConnectProvider(this, "github_oidc_provider", {
            url: "https://token.actions.githubusercontent.com",
            clientIds: ["sts.amazonaws.com"]
        })
    }

    static fromRefs(scope: Construct, id: string): iam.OpenIdConnectProvider {
        const arn = Stack.of(scope).formatArn({
            service: "iam",
            resource: "oidc-provider",
            resourceName: "token.actions.githubusercontent.com"
        })

        return iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(scope, id, arn) as iam.OpenIdConnectProvider
    }
}
