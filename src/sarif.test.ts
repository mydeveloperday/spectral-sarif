
import { minVal } from './sarif';

test('check minVal', () => {
    expect(minVal(0)).toEqual(1);
    expect(minVal(1)).toEqual(1);
    expect(minVal(2)).toEqual(2);
});
