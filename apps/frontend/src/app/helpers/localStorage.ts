export const storage = {
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return item
      ? JSON.parse(item)
      : null;
  }
};
