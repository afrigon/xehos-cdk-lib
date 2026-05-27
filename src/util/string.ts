function splitWords(s: string): string[] {
    if (!s) {
        return []
    }

    const ascii = s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")

    return ascii
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[^A-Za-z0-9]+/g, " ")
        .trim()
        .split(/\s+/)
        .filter(n => n.length)
}

export function pascal(s: string): string {
    return splitWords(s)
        .map(w => w[0].toUpperCase() + w.slice(1))
        .join("")
}

export function camel(s: string): string {
    const value = pascal(s)

    if (!value) {
        return ""
    }

    return `${value.charAt(0).toLowerCase()}${value.slice(1)}`
}

export function snake(s: string, separator: string = "_"): string {
    return splitWords(s)
        .map(w => w.toLowerCase())
        .join(separator)
}

export function kebab(s: string): string {
    return snake(s, "-")
}
