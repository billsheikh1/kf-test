import { fetchOutages, fetchSiteInfo } from './api';
import { filterOutagesByDate } from './filters';

export default async function run() {
    const outages = await fetchOutages();
    const siteInfo = await fetchSiteInfo('norwich-pear-tree');
    const filteredOutagesByDate = filterOutagesByDate({outages, startDate: `2022-01-01T00:00:00.000Z`});
}