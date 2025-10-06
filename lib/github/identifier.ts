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
            .map(n => n.toLowerCase())
            .map(n => n.replace(/[^a-z0-9-]/g, "-"))
            .map(n => n.replace(/-+/g, "-"))
            .map(n => n.replace(/^-|-$/g, ""))
            .join("-")
    }
}