import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
export declare class OpenIdConnectProvider extends iam.OpenIdConnectProvider {
    constructor(scope: Construct, id: string);
    static fromRefs(scope: Construct, id: string): OpenIdConnectProvider;
}
//# sourceMappingURL=oidc-provider.d.ts.map