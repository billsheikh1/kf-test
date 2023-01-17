/**
 * Checks if the date follows a particular format
 * @param date string date to validate
 * @returns boolean
 */
export function dateIsValid(date: string): boolean {
    const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)$/; // Example - 2022-02-01T00:00:00.000Z
    return dateRegex.test(date);
};

/**
 * Checks if the site id is valid
 * @param siteId string id to validate
 * @returns boolean
 */
export function siteIdIsValid(siteId: string): boolean {
    const idRegex = /^([a-z]+(-[a-z]+)*)$/; // Example - pear-fisher
    return idRegex.test(siteId);
};

/**
 * Checks if the command line arguments are valid
 * @param args string[] arguments
 * @returns boolean
 */
export function argumentsAreValid(args: string[]): boolean {
    return !(args.length < 1 || args.length > 3);
};