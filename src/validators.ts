export function dateIsValid(date: string): boolean {
    const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)$/;
    return dateRegex.test(date);
};

export function siteIdIsValid(id: string): boolean {
    const idRegex = /^([a-z]+(-[a-z]+)*)$/;
    return idRegex.test(id);
};

export function argumentsAreValid(args: string[]): boolean {
    return !(args.length < 1 || args.length > 3);
};