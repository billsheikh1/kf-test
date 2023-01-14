import fetch from 'node-fetch';

const endpoints = {
    outages: 'outages',
    siteInfo: 'site-info',
    siteOutages: 'site-outages'
};

export async function fetchOutages(): Promise<[Outages]> {
    const response = await fetch(`${process.env.BASE_ENDPOINT}${this.endpoint.outages}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY
        }
    });

    if (!response.ok) throw new Error(response.statusText);

    return await response.json() as Promise<[Outages]>;
}

export async function fetchSiteInfo(siteId: string): Promise<SiteInfo> {
    const response = await fetch(`${process.env.BASE_ENDPOINT}${this.endpoint.siteInfo}/${siteId}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY
        }
    });

    if (!response.ok) throw new Error(response.statusText);

    return await response.json() as Promise<SiteInfo>;
}