import { filterByDeviceIds, filterOutagesByDate } from './filters';
import { fetchOutages, fetchSiteInfo, postEhanchedOutages } from './api';
import { dateIsValid, siteIdIsValid } from './validators';
import { Device } from './types/Device';
import { constructEnhancedOutages } from './helpers';
import { OutageQuery } from './types/OutageQuery';

export default async function run(query: OutageQuery) {
    const { siteId, startDate, endDate } = query;
    if (!siteIdIsValid(siteId)) throw new Error();
    if (startDate && !dateIsValid(startDate)) throw new Error();
    if (endDate && !dateIsValid(endDate)) throw new Error();

    const outages = await fetchOutages();
    const siteInfo = await fetchSiteInfo(siteId);
    const { devices } = siteInfo;
    const deviceIds = devices.map((device: Device) => device.id);
    const filteredOutagesByDate = filterOutagesByDate({
        outages,
        startDate: startDate
    });
    const filteredOutagesByDeviceIds = filterByDeviceIds({
        outages: filteredOutagesByDate,
        deviceIds
    });

    const enhancedOutages = constructEnhancedOutages(filteredOutagesByDeviceIds, devices);

    const postResponse = await postEhanchedOutages(siteId, enhancedOutages);
    console.log('post', postResponse);
};