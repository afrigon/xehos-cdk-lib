import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { GithubRepositoryIdentifier } from "./identifier.js";
export interface GithubActionProps {
    repository: GithubRepositoryIdentifier;
    policies: [iam.ManagedPolicy];
}
export declare class GithubActionRole extends Construct {
    constructor(scope: Construct, id: string, props: GithubActionProps);
}
//# sourceMappingURL=github-actions.d.ts.map