import { Construct } from "constructs"
import { ApplicationContext } from "../context.js"
import * as cdk from "aws-cdk-lib"
import * as r53 from "aws-cdk-lib/aws-route53"

export interface DNSProps {
    domain: string,
    emailConfiguration?: EmailDNSConfiguration
}

export interface EmailDNSConfiguration {
    mxa: string,
    mxb: string,
    spf: string
    dkim: string
}

export class DNS extends Construct {
    constructor(scope: Construct, id: string, props: DNSProps) {
        super(scope, id)

        const context = ApplicationContext.of(this)

        const zone = new r53.PublicHostedZone(this, context.identifier("dns", "zone"), {
            zoneName: props.domain,
            comment: `DNS for ${props.domain}`
        })

        new r53.CnameRecord(this, context.identifier("dns", "www-redirect"), {
            zone,
            recordName: "www",
            domainName: props.domain
        })

        if (props.emailConfiguration) {
            new r53.MxRecord(this, context.identifier("dns", "email"), {
                zone,
                values: [
                    { priority: 10, hostName: props.emailConfiguration.mxa },
                    { priority: 10, hostName: props.emailConfiguration.mxb }
                ]
            })

            new r53.TxtRecord(this, context.identifier("dns", "email", "spf"), {
                zone,
                values: [props.emailConfiguration.spf]
            })

            new r53.TxtRecord(this, context.identifier("dns", "email", "dkim"), {
                zone,
                recordName: "pic._domainkey",
                values: [props.emailConfiguration.dkim]
            })
        }

        new cdk.CfnOutput(this, context.identifier("dns", "url"), {
            value: cdk.Fn.join(", ", cdk.Token.asList(zone.hostedZoneNameServers))
        })
    }
}
