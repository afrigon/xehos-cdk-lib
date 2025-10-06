import { Construct } from "constructs"
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

        const zone = new r53.PublicHostedZone(this, "Zone", {
            zoneName: props.domain,
            comment: `DNS for ${props.domain}`
        })

        new r53.CnameRecord(this, "WWW", {
            zone,
            recordName: "www",
            domainName: props.domain
        })

        if (props.emailConfiguration) {
            new r53.MxRecord(this, "Email", {
                zone,
                values: [
                    { priority: 10, hostName: props.emailConfiguration.mxa },
                    { priority: 10, hostName: props.emailConfiguration.mxb }
                ]
            })

            new r53.TxtRecord(this, "EmailSPF", {
                zone,
                values: [props.emailConfiguration.spf]
            })

            new r53.TxtRecord(this, "EmailDKIM", {
                zone,
                recordName: "pic._domainkey",
                values: [props.emailConfiguration.dkim]
            })
        }

        new cdk.CfnOutput(this, "Url", {
            value: cdk.Fn.join(", ", cdk.Token.asList(zone.hostedZoneNameServers))
        })
    }
}
