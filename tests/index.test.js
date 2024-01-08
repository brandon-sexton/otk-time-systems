import {
  calendarToJulian,
  daysToHours,
  daysToMinutes,
  daysToSeconds,
  hoursToDays,
  hoursToMinutes,
  hoursToSeconds,
  hmsToDays,
  julianToCalendar,
  minutesToDays,
  minutesToHours,
  minutesToSeconds,
  secondsToDays,
  secondsToHours,
  secondsToMinutes,
  Epoch,
  julianTTtoUTC,
} from 'time-systems';
import {degreesToRadians} from 'unit-conversions-js';

test('minutes to seconds', () => {
  expect(minutesToSeconds(1)).toBe(60, '1 minute should be 60 seconds');
});

test('seconds to minutes', () => {
  expect(secondsToMinutes(60)).toBe(1, '60 seconds should be 1 minute');
});

test('hours to minutes', () => {
  expect(hoursToMinutes(1)).toBe(60, '1 hour should be 60 minutes');
});

test('minutes to hours', () => {
  expect(minutesToHours(60)).toBe(1, '60 minutes should be 1 hour');
});

test('days to hours', () => {
  expect(daysToHours(1)).toBe(24, '1 day should be 24 hours');
});

test('hours to days', () => {
  expect(hoursToDays(24)).toBe(1, '24 hours should be 1 day');
});

test('seconds to days', () => {
  expect(secondsToDays(86400)).toBe(1, '86400 seconds should be 1 day');
});

test('days to seconds', () => {
  expect(daysToSeconds(1)).toBe(86400, '1 day should be 86400 seconds');
});

test('days to minutes', () => {
  expect(daysToMinutes(1)).toBe(1440, '1 day should be 1440 minutes');
});

test('minutes to days', () => {
  expect(minutesToDays(1440)).toBe(1, '1440 minutes should be 1 day');
});

test('seconds to hours', () => {
  expect(secondsToHours(3600)).toBe(1, '3600 seconds should be 1 hour');
});

test('hours to seconds', () => {
  expect(hoursToSeconds(1)).toBe(3600, '1 hour should be 3600 seconds');
});

test('hours, minutes, and seconds to days', () => {
  expect(
      hmsToDays(14, 33, 36)).toBe(
      0.6066666666666666, '14:33:36 should be 0.606666666667 days');
});

test('p.41 section 3.6 example', () => {
  expect(
      calendarToJulian(2010, 1, 1, 0, 0, 0)).toBe(
      2455197.5, '2010-01-01 00:00:00 should be 2455197.5');
});

test('p.51 section 3.15 test #5', () => {
  expect(
      calendarToJulian(2010, 11, 1, 0, 0, 0)).toBe(
      2455501.5, '2010-11-01 00:00:00 should be 2455501.5');
});

test('p.51 section 3.15 test #6', () => {
  expect(
      calendarToJulian(2015, 5, 10, 6, 0, 0)).toBe(
      2457152.75, '2015-05-10 06:00:00 should be 2457152.75');
});

test('p.51 section 3.15 test #7', () => {
  expect(
      calendarToJulian(2015, 5, 10, 18, 0, 0)).toBe(
      2457153.25, '2015-05-10 18:00:00 should be 2457153.25');
});

test('p.51 section 3.15 test #9', () => {
  expect(
      julianToCalendar(2455323.0)).toEqual(
      {year: 2010, month: 5, day: 6, hour: 12, minute: 0, second: 0},
      '2455323.0 should be 2010-05-06 12:00:00');
});

test('epoch constructor', () => {
  const epoch = new Epoch('2018-08-08T08:08:08.888Z');
  expect(epoch).toBeInstanceOf(Epoch);
  expect(julianTTtoUTC(epoch.julianTT)).toBe(2458338.8389917593);
});

test('epoch addition', () => {
  const epoch = new Epoch('2018-08-08T08:08:08.888Z');
  expect(epoch.plusDays(1).toString()).toBe('2018-08-09T08:08:08.888Z');
});

test('GMST', () => {
  const epoch = new Epoch('2022-12-19T12:00:00.000Z');
  expect(epoch.getGMST()).toBeCloseTo(degreesToRadians(268.0707472726), 6);
});

test('days past J2000', () => {
  const epoch = new Epoch('2022-12-19T12:00:00.000Z');
  expect(epoch.getDaysPastJ2000()).toBeCloseTo(8388.0);
});
