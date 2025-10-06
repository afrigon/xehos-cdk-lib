import { Construct } from "constructs"
import * as cdk from "aws-cdk-lib"
import * as iam from "aws-cdk-lib/aws-iam"
import { OpenIdConnectProvider as GithubOIDCProvider } from "./oidc-provider.js"
import { GithubRepositoryIdentifier } from "./identifier.js"

export interface GithubActionProps {
    repository: GithubRepositoryIdentifier,
    policies: iam.ManagedPolicy[]
}

export class GithubActionRole extends Construct {
    constructor(scope: Construct, id: string, props: GithubActionProps) {
        super(scope, id)

        const provider = GithubOIDCProvider.fromRefs(this, `${props.repository.identifier()}-oidc-provider`)

        const principal = new iam.FederatedPrincipal(
            provider.openIdConnectProviderArn,
            {
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
                },
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": `repo:${props.repository.urlIdentifier()}:ref:refs/tags/*`
                }
            },
            "sts:AssumeRoleWithWebIdentity"
        )

        const role = new iam.Role(this, `github-action-${props.repository.identifier()}`, {
            description: `role assumed by github action for tags on ${props.repository.urlIdentifier()}`,
            maxSessionDuration: cdk.Duration.hours(1),
            assumedBy: principal
        })

        for (const policy of props.policies) {
            role.addManagedPolicy(policy)
        }
    }
}
