export declare class GithubRepositoryIdentifier {
    owner: string;
    repository: string;
    constructor(owner: string, repository: string);
    static from(repository: string): GithubRepositoryIdentifier;
    urlIdentifier(): string;
    identifier(): string;
}
//# sourceMappingURL=identifier.d.ts.map