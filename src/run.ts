import { filterByDeviceIds, filterOutagesByDate } from './filters';
import { fetchOutages, fetchSiteInfo, postEhanchedOutages } from './api';
import { dateIsValid, siteIdIsValid } from './validators';
import { Device } from './types/Device';
import { constructEnhancedOutages } from './helpers';
import { OutageQuery } from './types/OutageQuery';

/**
 * Runs the scenario provided in the task
 * @param query OutageQuery query coming from the command line
 * @returns Promise<unknown> this would be the status code returned from the API
 */
export default async function run(query: OutageQuery): Promise<unknown> {
    const { siteId, startDate, endDate } = query;

    // Validation
    if (!siteIdIsValid(siteId)) throw new Error();
    if (startDate && !dateIsValid(startDate)) throw new Error();
    if (endDate && !dateIsValid(endDate)) throw new Error();

    // Fetch data
    const outages = await fetchOutages();
    const siteInfo = await fetchSiteInfo(siteId);
    const { devices } = siteInfo;

    // Filter Data
    const deviceIds = devices.map((device: Device) => device.id);
    const filteredOutagesByDate = filterOutagesByDate({
        outages,
        startDate: startDate
    });
    const filteredOutagesByDeviceIds = filterByDeviceIds({
        outages: filteredOutagesByDate,
        deviceIds
    });

    // Construct and post outages
    const enhancedOutages = constructEnhancedOutages(filteredOutagesByDeviceIds, devices);

    const postResponse = await postEhanchedOutages(siteId, enhancedOutages);
    return postResponse;
};