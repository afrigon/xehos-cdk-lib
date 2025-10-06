import { pascal } from "../util/string.js"

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

    identifier(): string {
        return `${this.owner}/${this.repository}`
    }

    awsIdentifier(): string {
        return pascal(this.identifier())
    }
}