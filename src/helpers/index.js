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
