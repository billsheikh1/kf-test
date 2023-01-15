import { Outages } from './types/Outages';
import { dateValidator } from './validators';

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

export function filterByDeviceIds(params: { outages: Outages[], deviceIds: string[] }): Outages[] {

    const { outages, deviceIds } = params;
    const filteredOutages: Outages[] = [];

    deviceIds.map((id: string) => {
        filteredOutages.push(outages.find((outage) => outage.id === id));
    });

    return filteredOutages;
}