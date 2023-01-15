import axios from 'axios';
import { EnhancedOutages } from './types/EnhancedOutages';
import { Outages } from './types/Outages';
import { SiteInfo } from './types/SiteInfo';
import { Endpoints } from './endpoints';

export async function fetchOutages(): Promise<[Outages]> {
    console.log('key', process.env.API_KEY);
    console.log('base', process.env.BASE_ENDPOINT);
    try {
        const response = await axios({
            method: 'get',
            url:`${process.env.BASE_ENDPOINT}${Endpoints.outages}`,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });
    
        if (!(response.statusText === 'OK')) throw new Error(response.statusText);
    
        return await response.data as Promise<[Outages]>;
    }
    catch (err) {
        console.error('outages', err);
    }
}

export async function fetchSiteInfo(siteId: string): Promise<SiteInfo> {
    try {
        const response = await axios({
            method: 'get',
            url:`${process.env.BASE_ENDPOINT}${Endpoints.siteInfo}/${siteId}`,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });
    
    
        if (!(response.statusText === 'OK')) throw new Error(response.statusText);
    
        return await response.data as Promise<SiteInfo>;
    }
    catch(err) {
        console.error('siteInfo', err);
    }
}

export async function postEhanchedOutages(siteId: string, body: EnhancedOutages[]): Promise<unknown> {
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.BASE_ENDPOINT}${Endpoints.siteOutages}/${siteId}`,
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });
    
        if (!(response.statusText === 'OK')) throw new Error(response.statusText);
    
        return await response.data;
    }
    catch (err) {
        console.error('post', err);
    }
}