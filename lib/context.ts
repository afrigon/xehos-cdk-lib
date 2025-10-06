import { Stack } from "aws-cdk-lib"
import { Construct } from "constructs"
import { BaseStack } from "./base.js"

export declare enum Environment {
    DEVELOPMENT = "dev",
    STAGING = "stage",
    PRODUCTION = "prod",
}

export class ApplicationContext {
    readonly application: string
    readonly environment?: string
    readonly component?: string

    constructor(
        application: string,
        environment?: string,
        component?: string
    ) {
        this.application = application
        this.environment = environment
        this.component = component
    }

    withComponent(component: string): ApplicationContext {
        return new ApplicationContext(this.application, this.environment, component)
    }

    identifier(...components: string[]): string {
        const items = [this.application]

        if (this.environment) {
            items.push(this.environment)
        }

        if (this.component) {
            items.push(this.component)
        }

        items.push(...components)

        const id = items
            .filter(n => n.length)
            .join("-")

        return id
    }

    static of(scope: Construct): ApplicationContext {
        return (Stack.of(scope) as BaseStack).context
    }
}
