function dateValidator(date: string): void {
    const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)$/;
    if (!dateRegex.test(date) || !dateRegex.test(date)) throw new Error('Invalid date format.');
}

export function filterOutagesByDate(params: { outages: Outages[], startDate?: string, endDate?: string }): Outages[] {

    const { outages, startDate, endDate } = params;

    let startDateObj: Date;
    let endDateObj: Date;

    if (startDate) {
        dateValidator(startDate);
        startDateObj = new Date(startDate);
    }
    if (endDate) {
        dateValidator(endDate);
        endDateObj = new Date(endDate);
    }
    
    if (startDate && endDate) {
        return outages.filter((outage: Outages) => {
            const beginObj = new Date(outage.begin);
            const endObj = new Date(outage.end);
            return beginObj > startDateObj && endObj < endDateObj;
        });
    }
    else if (startDate && !endDate) {
        return outages.filter((outage: Outages) => {
            const beginObj = new Date(outage.begin);
            return beginObj > startDateObj;
        });
    }
    else if (!startDate && endDate) {
        return outages.filter((outage: Outages) => {
            const endObj = new Date(outage.end);
            return endObj < endDateObj;
        });
    }

    return outages;
}