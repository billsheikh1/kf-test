import { Device } from './types/Device';
import { EnhancedOutages } from './types/EnhancedOutages';
import { Outages } from './types/Outages';

/**
 * Creates the enhanced outages from outages and devices
 * @param outages Outages[] outages of a particular site
 * @param devices Devices[] list of devices
 * @returns EnhancedOutages[]
 */
export function constructEnhancedOutages(outages: Outages[], devices: Device[]): EnhancedOutages[] {
    return outages.map((outage) => {
        const matchingDevice = devices.find((device) => outage.id === device.id);

        return {
            id: outage.id,
            name: matchingDevice.name,
            begin: outage.begin,
            end: outage.end
        }
    });
}