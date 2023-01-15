import { Request, Response } from 'express';
import { filterByDeviceIds, filterOutagesByDate } from '../filters';
import { fetchOutages, fetchSiteInfo, postEhanchedOutages } from '../api';
import { dateValidator, siteIdValidator } from '../validators';
import { Outages } from '../types/Outages';
import { Device } from '../types/Device';
import { EnhancedOutages } from '../types/EnhancedOutages';

function constructEnhancedOutages(outages: Outages[], devices: Device[]): EnhancedOutages[] {
    return outages.map((outage) => {
        return {
            id: outage.id,
            name: devices.find((device) => outage.id === device.id).name,
            begin: outage.begin,
            end: outage.end
        }
    });
}
 
export default async function OutageController(req: Request, res: Response) {
    const { siteId, startDate, endDate } = req.query;
    if (siteId) {
        try {
            siteIdValidator(siteId as string);
        }
        catch (err) {
            res.status(422).send(err.message);
        }
    }
    if (startDate) {
        try {
            dateValidator(startDate as string);
        }
        catch (err) {
            res.status(422).send(err.message);
        }
    }
    if (endDate) {
        try {
            dateValidator(endDate as string);
        }
        catch (err) {
            res.status(422).send(err.message);
        }
    }

    const outages = await fetchOutages();
    const siteInfo = await fetchSiteInfo(siteId as string);
    const { devices } = siteInfo;
    const deviceIds = devices.map((device: Device) => device.id);
    const filteredOutagesByDate = filterOutagesByDate({
        outages,
        startDate: startDate as string
    });
    const filteredOutagesByDeviceIds = filterByDeviceIds({
        outages: filteredOutagesByDate,
        deviceIds
    });

    const enhancedOutages = constructEnhancedOutages(outages, devices);

    const postResponse = await postEhanchedOutages(siteId as string, enhancedOutages);

    res.send(postResponse);
};