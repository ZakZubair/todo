import { getTimeElapsedInMinutes } from './index';

test('get time elapsed in minutes for 30 sec', () => {
  expect(getTimeElapsedInMinutes(30)).toBe('0:30');
});

test('get time elapsed in minutes for 120 sec', () => {
  expect(getTimeElapsedInMinutes(120)).toBe('2:00');
});

test('get time elapsed in minutes for 150 sec', () => {
  expect(getTimeElapsedInMinutes(150)).toBe('2:30');
});
