import { Outages } from './types/Outages';
import { dateIsValid } from './validators';

export function filterOutagesByDate(params: { outages: Outages[], startDate?: string, endDate?: string }): Outages[] {

    const { outages, startDate, endDate } = params;

    if (startDate && !dateIsValid(startDate)) throw new Error();
    if (endDate && !dateIsValid(endDate)) throw new Error();
    
    const startDateObj = startDate ? new Date(startDate) : undefined;
    const endDateObj = endDate ? new Date(endDate) : undefined;

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