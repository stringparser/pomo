import { TimerItem } from '@/models/Time';
import { storage } from '@/services/storage';

const mapKey = (name: string) => `task_${name}`;

export const setTask = <T extends TimerItem = TimerItem>(value: T) => {
  storage.set(mapKey(value.label), value);
  return undefined;
};

export const getTask = <T extends TimerItem = TimerItem>(name: string): T | undefined => {
  const task = storage.get<T>(mapKey(name));
  return task;
};

export const getAllTasks = (): TimerItem[] => {
  const result: TimerItem[] = [];

  if (!process.browser) {
    return result;
  }

  return Object.keys(window.localStorage).reduce((acc, key) => {
    const item = /^task_/.test(key) ? storage.get<TimerItem>(key) : undefined;
    return item == null ? acc : acc.concat(item);
  }, result);
};
