import Enums from './EnumsManager';
import { toTimezone, toUtc, stringifyOffset, getOffsetByTimeZone } from './dateTimeUtils';

const { LocalStorageKeys } = Enums;
const { Timezone } = LocalStorageKeys;

const targetDate = '2018-04-18';
const targetTime = `${targetDate} 12:50:40`;
// Test utils
const setTimezone = (dateFormat, timeFormat, offset) => {
  const config = {
    dateFormat,
    timeFormat,
    offset,
  };
  return window.localStorage.setItem(Timezone, JSON.stringify(config));
};

/**
 * Clear localStorage before each test run
 */
beforeEach(() => window.localStorage.removeItem(Timezone));

// NOTES: lodash needs to be mocked, because we loaded lodash js in script rather than bundle it.
//        So when run tests, lodash related function cannot be found.
describe('---===BASIC FUNCS===---', () => {
  const mock = jest.fn(() => "bar");
  describe('FUNC:STRINGIFYOFFSET', () => {
    const noOffset = '+0000';
    test('Format -> YYYY-MM-DD', () => {
      expect(stringifyOffset('')).toBe(noOffset);
    });
  });

  describe('FUNC:GETOFFSETTIMEZONE', () => {
  });
});

describe('---===CONVERT TO TIMEZONE===---', () => {
  describe('Convert Date only', () => {
    test('Format -> YYYY-MM-DD', () => {
      setTimezone('YYYY-MM-DD', '', '');
      expect(toTimezone(targetDate)).toBe(targetDate);
    });
  
    test('Format -> MM-DD-YYYY', () => {
      setTimezone('MM-DD-YYYY', '', '');
      expect(toTimezone(targetDate)).toBe('04-18-2018');
    });
  
    test('Format -> DD-MM-YYYY', () => {
      setTimezone('DD-MM-YYYY', '', '');
      expect(toTimezone(targetDate)).toBe('18-04-2018');
    });
  });

  describe('Convert Date time without Offset', () => {
    test('Format -> YYYY-MM-DD HH:mm:ss', () => {
      setTimezone('', 'YYYY-MM-DD HH:mm:ss', '');
      expect(toTimezone(targetTime, true)).toBe('2018-04-18 23:50:40');
    });
  
    test('Format -> MM-DD-YYYY HH:mm:ss', () => {
      setTimezone('', 'MM-DD-YYYY HH:mm:ss', '');
      expect(toTimezone(targetTime, true)).toBe('04-18-2018 23:50:40');
    });
  
    test('Format -> DD-MM-YYYY HH:mm:ss', () => {
      setTimezone('', 'DD-MM-YYYY HH:mm:ss', '');
      expect(toTimezone(targetTime, true)).toBe('18-04-2018 23:50:40');
    });
  });

  describe('Convert Date time w/Offset', () => {
    test('Format -> YYYY-MM-DD HH:mm:ss -0200', () => {
      setTimezone('', 'YYYY-MM-DD HH:mm:ss', '-0200');
      expect(toTimezone(targetTime, true)).toBe(`${targetDate} 10:50:40`);
    });
  
    test('Format -> MM-DD-YYYY HH:mm:ss -0200', () => {
      setTimezone('', 'MM-DD-YYYY HH:mm:ss', '-0200');
      expect(toTimezone(targetTime, true)).toBe('04-18-2018 10:50:40');
    });
  
    test('Format -> DD-MM-YYYY HH:mm:ss -0200', () => {
      setTimezone('', 'DD-MM-YYYY HH:mm:ss', '-0200');
      expect(toTimezone(targetTime, true)).toBe('18-04-2018 10:50:40');
    });

    test('Format -> YYYY-MM-DD HH:mm:ss +1300', () => {
      setTimezone('', 'YYYY-MM-DD HH:mm:ss', '+1300');
      expect(toTimezone(targetTime, true)).toBe('2018-04-19 01:50:40');
    });
  
    test('Format -> MM-DD-YYYY HH:mm:ss +1300', () => {
      setTimezone('', 'MM-DD-YYYY HH:mm:ss', '+1300');
      expect(toTimezone(targetTime, true)).toBe('04-19-2018 01:50:40');
    });
  
    test('Format -> DD-MM-YYYY HH:mm:ss +1300', () => {
      setTimezone('', 'DD-MM-YYYY HH:mm:ss', '+1300');
      expect(toTimezone(targetTime, true)).toBe('19-04-2018 01:50:40');
    });
  });

  describe('Invalid Inputs', () => {
    test('Non-date string', () => {
      setTimezone('DD-MM-YYYY', '', '');
      expect(toTimezone('test', true)).toBeNull();
    });
    test('Null value', () => {
      setTimezone('DD-MM-YYYY', '', '');
      expect(toTimezone(null, true)).toBeNull();
    });
  });
});


describe('---===CONVERT TO UTC===---', () => {
  describe('Convert Date only', () => {
    test('Format -> YYYY-MM-DD', () => {
      setTimezone('YYYY-MM-DD', '', '');
      expect(toUtc(targetDate)).toBe(targetDate);
    });

    test('Format -> MM-DD-YYYY', () => {
      setTimezone('MM-DD-YYYY', '', '');
      expect(toUtc('04-18-2018')).toBe(targetDate);
    });

    test('Format -> DD-MM-YYYY', () => {
      setTimezone('DD-MM-YYYY', '', '');
      expect(toUtc('18-04-2018')).toBe(targetDate);
    });
  });

  describe('Convert Date time without Offset', () => {
    test('Format -> YYYY-MM-DD HH:mm:ss', () => {
      setTimezone('', 'YYYY-MM-DD HH:mm:ss', '');
      expect(toUtc('2018-04-18 23:50:40', true)).toBe(targetTime);
    });

    test('Format -> MM-DD-YYYY HH:mm:ss', () => {
      setTimezone('', 'MM-DD-YYYY HH:mm:ss', '');
      expect(toUtc('04-18-2018 23:50:40', true)).toBe(targetTime);
    });

    test('Format -> DD-MM-YYYY HH:mm:ss', () => {
      setTimezone('', 'DD-MM-YYYY HH:mm:ss', '');
      expect(toUtc('18-04-2018 23:50:40', true)).toBe(targetTime);
    });
  });

  describe('Convert Date time w/Offset', () => {
    test('Format -> YYYY-MM-DD HH:mm:ss', () => {
      setTimezone('', 'YYYY-MM-DD HH:mm:ss', '-0200');
      expect(toUtc('2018-04-18 10:50:40', true)).toBe(targetTime);
    });

    test('Format -> MM-DD-YYYY HH:mm:ss', () => {
      setTimezone('', 'MM-DD-YYYY HH:mm:ss', '-0200');
      expect(toUtc('04-18-2018 10:50:40', true)).toBe(targetTime);
    });

    test('Format -> DD-MM-YYYY HH:mm:ss', () => {
      setTimezone('', 'DD-MM-YYYY HH:mm:ss', '-0200');
      expect(toUtc('18-04-2018 10:50:40', true)).toBe(targetTime);
    });

    test('Format -> YYYY-MM-DD HH:mm:ss', () => {
      setTimezone('', 'YYYY-MM-DD HH:mm:ss', '+1300');
      expect(toUtc('2018-04-19 01:50:40', true)).toBe(targetTime);
    });

    test('Format -> MM-DD-YYYY HH:mm:ss', () => {
      setTimezone('', 'MM-DD-YYYY HH:mm:ss', '+1300');
      expect(toUtc('04-19-2018 01:50:40', true)).toBe(targetTime);
    });

    test('Format -> DD-MM-YYYY HH:mm:ss', () => {
      setTimezone('', 'DD-MM-YYYY HH:mm:ss', '+1300');
      expect(toUtc('19-04-2018 01:50:40', true)).toBe(targetTime);
    });
  });

  describe('Invalid Inputs', () => {
    test('Non-date string', () => {
      setTimezone('', 'DD-MM-YYYY HH:mm:ss', '');
      expect(toTimezone('test')).toBeNull();
    });
    test('Null value', () => {
      setTimezone('', 'DD-MM-YYYY HH:mm:ss', '');
      expect(toTimezone(null)).toBeNull();
    });
  });
});
