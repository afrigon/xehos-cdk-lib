import { Construct } from "constructs";
interface ARecordProps {
    domainName: string;
    subdomainName?: string;
    addresses: string[];
}
export declare class ARecord extends Construct {
    constructor(scope: Construct, id: string, props: ARecordProps);
}
export {};
//# sourceMappingURL=arecord.d.ts.map