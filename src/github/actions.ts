import { Construct } from "constructs"
import * as cdk from "aws-cdk-lib"
import * as iam from "aws-cdk-lib/aws-iam"
import { GithubOpenIdConnectProvider } from "./oidc-provider.js"
import { GithubRepositoryIdentifier } from "./identifier.js"

export interface GithubActionProps {
    roleName?: string,
    repository: GithubRepositoryIdentifier,
    policies: iam.ManagedPolicy[]
}

export class GithubActionRole extends Construct {
    constructor(scope: Construct, id: string, props: GithubActionProps) {
        super(scope, id)

        const provider = GithubOpenIdConnectProvider.fromRefs(this, "Provider")

        const principal = new iam.FederatedPrincipal(
            provider.openIdConnectProviderArn,
            {
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
                },
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": `repo:${props.repository.identifier()}:ref:refs/tags/*`
                }
            },
            "sts:AssumeRoleWithWebIdentity"
        )

        const role = new iam.Role(this, props.repository.awsIdentifier(), {
            roleName: props.roleName,
            description: `role assumed by github action for tags on ${props.repository.identifier()}`,
            maxSessionDuration: cdk.Duration.hours(1),
            assumedBy: principal
        })

        for (const policy of props.policies) {
            role.addManagedPolicy(policy)
        }

        new cdk.CfnOutput(this, "RoleArn", {
            value: role.roleArn
        })
    }
}
