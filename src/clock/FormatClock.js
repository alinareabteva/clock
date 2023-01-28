export const formatWithLeadingZero = (number) => {
    return number < 10 ? '0' + number : number
  }

  export const getMilisecondsForMinutes = (minutes) => {
    return minutes * 60 * 1000;
  }