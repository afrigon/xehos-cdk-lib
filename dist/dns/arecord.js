import { Construct } from "constructs";
import * as r53 from "aws-cdk-lib/aws-route53";
import { ApplicationContext } from "../context.js";
export class ARecord extends Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const context = ApplicationContext.of(this);
        const zone = r53.PublicHostedZone.fromLookup(this, context.identifier("dns", "a-record", "zone-ref"), {
            domainName: props.domainName
        });
        new r53.ARecord(this, context.identifier("dns", "a-record"), {
            zone,
            recordName: props.subdomainName,
            target: r53.RecordTarget.fromIpAddresses(...props.addresses)
        });
    }
}
