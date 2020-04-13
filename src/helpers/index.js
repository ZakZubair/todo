import dayjs from 'dayjs';

/**
 * Get time in minutes
 * @param {number} sec seconds
 * @return {string} The result of given seconds in minutes
 */
export const getTimeElapsedInMinutes = (sec) => {
  const minutes = Math.floor(sec / 60);
  let secRemainder = sec - minutes * 60;

  if (secRemainder < 10) {
    secRemainder = `0${secRemainder.toString()}`;
  }

  return `${minutes}:${secRemainder}`;
};

/**
 * Get current time
 * @return {string} Current time
 */
export const getCurrentTime = () => dayjs().format('DD/MM/YYYY h:mm a');

/**
 * Get formatted time
 * @param {date} dateTime seconds
 * @return {string} Formatted time
 */
export const getFormattedTime = (dateTime) => dayjs(dateTime).format('DD/MM/YYYY h:mm a');
