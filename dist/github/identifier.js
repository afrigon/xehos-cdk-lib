export class GithubRepositoryIdentifier {
    owner;
    repository;
    constructor(owner, repository) {
        this.owner = owner;
        this.repository = repository;
    }
    static from(repository) {
        const [owner, repo] = repository.split("/");
        if (owner == null || repo == null) {
            throw new Error(`Invalid Github String ${repository}`);
        }
        return new GithubRepositoryIdentifier(owner, repo);
    }
    urlIdentifier() {
        return `${this.owner}/${this.repository}`;
    }
    identifier() {
        return [this.owner, this.repository]
            .map(n => n.toLowerCase())
            .map(n => n.replace(/[^a-z0-9-]/g, "-"))
            .map(n => n.replace(/-+/g, "-"))
            .map(n => n.replace(/^-|-$/g, ""))
            .join("-");
    }
}
