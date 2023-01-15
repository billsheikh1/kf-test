import { describe, test, expect } from '@jest/globals';
import { argumentsAreValid, dateIsValid, siteIdIsValid } from '../src/validators';

describe(('Validators Unit tests'), () => {
    describe('dateIsValid tests', () => {
        test('valid date', () => {
            expect(dateIsValid('2022-01-01T00:00:00.000Z')).toBeTruthy();
        });
        test('invalid date', () => {
            expect(dateIsValid('4th jan 2002')).toBeFalsy();
        });
    });

    describe('siteIdIsValid tests', () => {
        test('valid siteId', () => {
            expect(siteIdIsValid('pear-tree')).toBeTruthy();
        });
        test('invalid siteId - uppercase', () => {
            expect(siteIdIsValid('PEAR-TREE')).toBeFalsy();
        });
        test('invalid siteId - camelcase', () => {
            expect(siteIdIsValid('pearTree')).toBeFalsy();
        });
    });

    describe('argumentsAreValid', () => {
        test('valid arguments', () => {
            expect(argumentsAreValid(['1', '2', '3'])).toBeTruthy();
        });
        test('invalid arguments - less than 1', () => {
            expect(argumentsAreValid([])).toBeFalsy();
        });
        test('invalid arguments - more than 3', () => {
            expect(argumentsAreValid(['1', '2', '3', '4'])).toBeFalsy();
        });
    });
});