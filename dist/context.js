import { Stack } from "aws-cdk-lib";
export class ApplicationContext {
    application;
    environment;
    component;
    constructor(application, environment, component) {
        this.application = application;
        this.environment = environment;
        this.component = component;
    }
    withComponent(component) {
        return new ApplicationContext(this.application, this.environment, component);
    }
    identifier(...components) {
        const items = [this.application];
        if (this.environment) {
            items.push(this.environment);
        }
        if (this.component) {
            items.push(this.component);
        }
        items.push(...components);
        const id = items
            .filter(n => n.length)
            .join("-");
        return id;
    }
    static of(scope) {
        return Stack.of(scope).context;
    }
}
