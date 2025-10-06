import { Construct } from "constructs"
import * as r53 from "aws-cdk-lib/aws-route53"

interface ARecordProps {
    domainName: string
    subdomainName?: string
    target: r53.RecordTarget
}

export class ARecord extends Construct {
    constructor(scope: Construct, id: string, props: ARecordProps) {
        super(scope, id)

        const zone = r53.PublicHostedZone.fromLookup(this, "Zone", {
            domainName: props.domainName
        })

        new r53.ARecord(this, "ARecord", {
            zone,
            recordName: props.subdomainName,
            target: props.target
        })
    }
}