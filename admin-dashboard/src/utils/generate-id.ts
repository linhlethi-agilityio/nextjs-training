export const generateRandomId = () => {
  const min = 100;
  const max = 999;

  // Generate two random numbers between 100 and 999
  const part1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const part2 = Math.floor(Math.random() * (max - min + 1)) + min;

  // Combine the two parts with a hyphen
  return `${part1}-${part2}`;
};
