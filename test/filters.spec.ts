import { describe, test, expect } from '@jest/globals';
import { filterByDeviceIds, filterOutagesByDate } from '../src/filters';

describe('Filter Tests', () => {
    describe('Filter by date', () => {
        const outages = [
            {
              "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
              "begin": "2021-07-26T17:09:31.036Z",
              "end": "2021-08-29T00:37:42.253Z"
            },
            {
              "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
              "begin": "2022-05-23T12:21:27.377Z",
              "end": "2022-11-13T02:16:38.905Z"
            },
            {
              "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
              "begin": "2022-12-04T09:59:33.628Z",
              "end": "2022-12-12T22:35:13.815Z"
            },
            {
              "id": "04ccad00-eb8d-4045-8994-b569cb4b64c1",
              "begin": "2022-07-12T16:31:47.254Z",
              "end": "2022-10-13T04:05:10.044Z"
            },
            {
              "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
              "begin": "2022-07-12T16:31:47.254Z",
              "end": "2022-10-13T04:05:10.044Z"
            },
            {
              "id": "27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1",
              "begin": "2021-07-12T16:31:47.254Z",
              "end": "2022-10-13T04:05:10.044Z"
            }
        ];

        test('Valid start and end date', () => {
            const startDate = `2021-07-25T00:00:00.000Z`;
            const endDate = `2021-08-30T00:00:00.000Z`;

            const filteredOutages = filterOutagesByDate({outages, startDate, endDate});

            expect(filteredOutages).toEqual(expect.arrayContaining([
                {
                    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                    "begin": "2021-07-26T17:09:31.036Z",
                    "end": "2021-08-29T00:37:42.253Z"
                }

            ]));
        });

        test('Valid start date no end date', () => {
            const startDate = `2022-12-04T00:00:00.000Z`;

            const filteredOutages = filterOutagesByDate({outages, startDate});

            expect(filteredOutages).toEqual(expect.arrayContaining([
                {
                    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                    "begin": "2022-12-04T09:59:33.628Z",
                    "end": "2022-12-12T22:35:13.815Z"
                }
            ]));
        });

        test('No start date valid end date', () => {
            const endDate = `2021-08-30T00:00:00.000Z`;

            const filteredOutages = filterOutagesByDate({outages, endDate});

            expect(filteredOutages).toEqual(expect.arrayContaining([
                {
                    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
                    "begin": "2021-07-26T17:09:31.036Z",
                    "end": "2021-08-29T00:37:42.253Z"
                }
            ]));
        });

        test('No results', () => {
            const startDate = `2023-01-01T00:00:00.000Z`;
            const filteredOutages = filterOutagesByDate({outages, startDate});
            expect(filteredOutages).toEqual(expect.arrayContaining([]));
        });

        test('Invalid date', () => {
            const startDate = '4th jan 2022';
            expect(() => filterOutagesByDate({outages, startDate})).toThrow(Error);
        })
    });

    describe('Filter by device ids', () => {
        test('Valid list of IDs', () => {
            const ids = [
                '1',
                '4'
            ];

            const data = [
                {
                    id: '1',
                    begin: 'begin',
                    end: 'end'
                },
                {
                    id: '10',
                    begin: 'begin', 
                    end: 'end'
                },
                {
                    id: '4',
                    begin: 'begin',
                    end: 'end'
                },
                {
                    id: '40',
                    begin: 'begin',
                    end: 'end'
                }
            ];

            const filteredOutages = filterByDeviceIds({
                outages: data,
                deviceIds: ids
            });

            expect(filteredOutages).toEqual(expect.arrayContaining([
                {
                    id: '1',
                    begin: 'begin',
                    end: 'end'
                },
                {
                    id: '4',
                    begin: 'begin',
                    end: 'end'
                }
            ]));
        });
    });
});