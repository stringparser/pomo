import { json2csvAsync } from 'json-2-csv';

import { TimerItem, TimerItemKey } from '@/models/Time';
import { storage } from '@/services/storage';

export const ONE_MINUTE_MS = 60 * 1e3;

export const getTaskId = (label = '') => {
  if (/^task_/.test(label)) {
    return label;
  }

  return `task_${Math.random().toString(32).slice(2)}`;
};

export const setTask = <T extends TimerItem = TimerItem>(value: T) => {
  if (!value.id) {
    alert('falta la id');
    return;
  }
  storage.set(getTaskId(value.id), value);
  return undefined;
};

export const startTask = <T extends Partial<TimerItem> = Partial<TimerItem>>({ id, ...data }: T) => {
  const last = getAllTasks()[0];
  const isSameTask = last && last.id === id;
  const canExtendLast = last && last.ended ? Date.now() - last.ended < ONE_MINUTE_MS : last != null;

  if (!isSameTask && last && !last.ended) {
    stopTask(last);
  }

  const task = canExtendLast ? { ...last, ...data, ended: undefined } : { ...data, id: getTaskId(), start: Date.now() };

  setTask(task);

  return task;
};

export const stopTask = <T extends TimerItem = TimerItem>(data: T) => {
  const task: TimerItem = { ...data, ended: Date.now() };
  setTask(task);
  return task;
};

export const removeTask = <T extends TimerItem = TimerItem>(data: T) => {
  if (data.id) {
    storage.remove(data.id);
  }
  return undefined;
};

export const getTask = <T extends TimerItem = TimerItem>(id: string): T | undefined => {
  const task = storage.get<T>(id);
  return task;
};

export const getAllTasks = (): TimerItem[] => {
  const result: TimerItem[] = [];

  if (!process.browser) {
    return result;
  }

  return Object.keys(window.localStorage)
    .reduce((acc, key) => {
      const item = /^task_/.test(key) ? storage.get<TimerItem>(key) : undefined;
      return item == null ? acc : acc.concat(item);
    }, result)
    .sort((a, b) => {
      return a.start && b.start ? b.start - a.start : 0;
    });
};

export async function createCSVExport() {
  const data = getAllTasks();
  const keys: TimerItemKey[] = ['id', 'start', 'ended', 'title', 'content'];

  const csv = await json2csvAsync(data, { keys });

  return new Blob([csv], { type: 'text/plain;charset=utf-8' });
}
