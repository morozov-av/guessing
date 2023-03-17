const getRandomNumberInRange = (min: number, max: number): number => {
  const decimalPlaces = 1;
  const rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
  const power = Math.pow(10, decimalPlaces);

  return Math.floor(rand * power) / power;
}

export const getMultiplier = (): number => {
  return getRandomNumberInRange(1, getRandomNumberInRange(1, 10))
}
