export class GithubRepositoryIdentifier {
    owner: string
    repository: string

    constructor(owner: string, repository: string) {
        this.owner = owner
        this.repository = repository
    }

    static from(repository: string) {
        const [owner, repo] = repository.split("/")

        if (owner == null || repo == null) {
            throw new Error(`Invalid Github String ${repository}`)
        }

        return new GithubRepositoryIdentifier(owner, repo)
    }

    urlIdentifier(): string {
        return `${this.owner}/${this.repository}`
    }

    identifier(): string {
        return [this.owner, this.repository]
            .join("_")
            .toLowerCase()
            .replace(/[^a-z0-9_]/g, "_")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "")
    }
}