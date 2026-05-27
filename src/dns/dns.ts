import { Construct } from "constructs"
import * as cdk from "aws-cdk-lib"
import * as r53 from "aws-cdk-lib/aws-route53"
import * as kms from "aws-cdk-lib/aws-kms"
import { kebab } from "../util/string.js"

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

        // DNSSEC
        const key = new kms.Key(this, "DNSSECKey", {
            keySpec: kms.KeySpec.ECC_NIST_P256,
            keyUsage: kms.KeyUsage.SIGN_VERIFY,
            alias: `${kebab(props.domain)}-dnssec-signing-key`,
            removalPolicy: cdk.RemovalPolicy.DESTROY
        })

        zone.enableDnssec({ kmsKey: key })

        // www redirection
        new r53.CnameRecord(this, "WWW", {
            zone,
            recordName: "www",
            domainName: props.domain
        })

        // email configuration
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

        // output
        new cdk.CfnOutput(this, "Url", {
            value: cdk.Fn.join(", ", cdk.Token.asList(zone.hostedZoneNameServers))
        })
    }
}
