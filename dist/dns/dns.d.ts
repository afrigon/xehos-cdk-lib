import { Construct } from "constructs";
export interface DNSProps {
    domain: string;
    emailConfiguration?: EmailDNSConfiguration;
}
export interface EmailDNSConfiguration {
    mxa: string;
    mxb: string;
    spf: string;
    dkim: string;
}
export declare class DNS extends Construct {
    constructor(scope: Construct, id: string, props: DNSProps);
}
//# sourceMappingURL=dns.d.ts.map