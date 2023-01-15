import { describe, test, expect } from '@jest/globals';
import { constructEnhancedOutages } from '../src/helpers';

describe('Helpers Unit Test', () => {
    describe('constructEnhancedOutages', () => {
        test('Created valid enhanced outages', () => {
            const outages = [
                {
                    id: '1',
                    begin: '2022-12-04T09:59:33.628Z',
                    end: '2022-12-04T09:59:33.628Z'
                },
                {
                    id: '3',
                    begin: '2022-12-04T09:59:33.628Z',
                    end: '2022-12-04T09:59:33.628Z'
                }
            ];

            const devices = [
                {
                    id: '1',
                    name: 'device1'
                },
                {
                    id: '3',
                    name: 'device3'
                }
            ];

            expect(constructEnhancedOutages(outages, devices)).toEqual(expect.arrayContaining([
                {
                    id: '1',
                    name: 'device1',
                    begin: '2022-12-04T09:59:33.628Z',
                    end: '2022-12-04T09:59:33.628Z'
                },
                {
                    id: '3',
                    name: 'device3',
                    begin: '2022-12-04T09:59:33.628Z',
                    end: '2022-12-04T09:59:33.628Z'
                }
            ]))
        });
    });
});