export const storage = {
  set: <T extends Record<string, unknown>>(key: string, value: T) => {
    if (process.browser) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
  get<T extends Record<string, unknown>>(key?: string): T | undefined {
    if (key == null || !process.browser) {
      return undefined;
    }

    try {
      const value = window.localStorage.getItem(key);
      return value != null ? (JSON.parse(value) as T) : undefined;
    } catch (error) {
      console.warn('could not get', key, error);
    }

    return undefined;
  },
  remove<T extends Record<string, unknown>>(key?: string): T | undefined {
    if (key == null || !process.browser) {
      return undefined;
    }

    try {
      const value = window.localStorage.removeItem(key);
      return value != null ? (JSON.parse(value) as T) : undefined;
    } catch (error) {
      console.warn('could not remove', key, error);
    }
  },
};
