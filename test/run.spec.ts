import { describe, test, expect } from '@jest/globals';
import run from '../src/run';

describe('Main tests', () => {
    test('Test whole application', async () => {
        const params = {
            siteId: 'norwich-pear-tree',
            startDate: '2022-01-01T00:00:00.000Z'
        };
        let response;
        try {
           response = await run(params);
        }
        catch(err) {
            response = 0;
        }
        expect(response).toBe(200);
    });
});