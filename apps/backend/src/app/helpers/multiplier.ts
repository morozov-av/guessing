export const getRandomNumberInRange = (min: number, max: number): number => {
  const decimalPlaces = 1;
  const rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
  const power = Math.pow(10, decimalPlaces);

  return Math.floor(rand * power) / power;
};

export const randomInteger = (min: number, max: number): number =>  {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getMultiplier = (): number => {
  return getRandomNumberInRange(1.5, getRandomNumberInRange(1.5, 10));
};
