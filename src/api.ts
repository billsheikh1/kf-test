import axios from 'axios';
import { EnhancedOutages } from './types/EnhancedOutages';
import { Outages } from './types/Outages';
import { SiteInfo } from './types/SiteInfo';
import { Endpoints } from './endpoints';
import config from '../assets/config.json';

/**
 * Fetches outages from 'outages'
 * @returns Promise<[Outages]>
 */
export async function fetchOutages(): Promise<[Outages]> {
    try {
        const response = await axios({
            method: 'get',
            url:`${config.baseEndpoint}${Endpoints.outages}`,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': config.apiKey
            }
        });
    
        return await response.data as Promise<[Outages]>;
    }
    catch (err) {
        console.error('outages', err.message);
    }
}

/**
 * Fetches site info from 'site-info'
 * @param siteId string
 * @returns Promise<SiteInfo>
 */
export async function fetchSiteInfo(siteId: string): Promise<SiteInfo> {
    try {
        const response = await axios({
            method: 'get',
            url:`${config.baseEndpoint}${Endpoints.siteInfo}/${siteId}`,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': config.apiKey
            }
        });
    
        return await response.data as Promise<SiteInfo>;
    }
    catch(err) {
        console.error('siteInfo', err.message);
    }
}

/**
 * Posts enhancedOutages to 'site-outages'
 * @param siteId string
 * @param body EhanchedOutages[] the payload to send the api
 * @returns Promise<unknown>
 */
export async function postEhanchedOutages(siteId: string, body: EnhancedOutages[]): Promise<unknown> {
    try {
        const response = await axios({
            method: 'post',
            url: `${config.baseEndpoint}${Endpoints.siteOutages}/${siteId}`,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': config.apiKey
            }
        });
    
        return await response.status;
    }
    catch (err) {
        console.error('post', err.message);
    }
}