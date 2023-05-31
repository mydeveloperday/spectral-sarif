
import { minVal, relative, exportSarif } from './sarif';
import { readFileSync,existsSync } from 'fs';

describe("saif tests", () => {
    test('check minVal', () => {
        expect(minVal(0)).toEqual(1);
        expect(minVal(1)).toEqual(1);
        expect(minVal(2)).toEqual(2);
    });

    test('check relative', () => {
        expect(relative("c:/cygwin64/source/", 'c:/cygwin64/source/spectral-sarif/openapi.yaml')).toEqual('spectral-sarif/openapi.yaml');
    });

    test('check relative case ensitive', () => {
        expect(relative("c:/cygwin64/source/", 'c:/cygwin64/Source/spectral-sarif/openapi.yaml')).toEqual('spectral-sarif/openapi.yaml');
    });

    test('check export', () => {
        expect(existsSync('out.json')).toEqual(true);
        exportSarif('out.json', 'testout.json', 'c:/cygwin64/source');
        expect(existsSync('testout.json')).toEqual(true);
    
        const results = JSON.parse(readFileSync('testout.json', 'utf8'))
    });

    test('check export to console', () => {
        expect(existsSync('out.json')).toEqual(true);
        exportSarif('out.json', '', 'c:/cygwin64/source');
    });

});