export function dateValidator(date: string): void {
    const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)$/;
    if (!dateRegex.test(date)) throw new Error('Invalid date format.');
};

export function siteIdValidator(id: string): void {
    const idRegex = /^([a-z]+(-[a-z]+)*)$/;
    if (!idRegex.test(id)) throw new Error('Invalid id format.');
};