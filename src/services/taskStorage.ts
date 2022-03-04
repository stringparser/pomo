import { json2csvAsync } from 'json-2-csv';

import { TimerItem } from '@/models/Time';
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

export const startTask = <T extends Partial<TimerItem> = Partial<TimerItem>>({ id, end, ...data }: T) => {
  const last = getAllTasks()[0];
  const isSameTask = last && last.description === data.description;
  const canExtendLast = isSameTask && last && last.end && Date.now() - last.end < ONE_MINUTE_MS;

  if (!isSameTask && last && !last.end) {
    stopTask(last);
  }

  const task = canExtendLast ? { ...last, ...data, end: undefined } : { ...data, id: getTaskId(), start: Date.now() };

  setTask(task);

  return task;
};

export const stopTask = <T extends TimerItem = TimerItem>(data: T) => {
  const task = { start: Date.now() - ONE_MINUTE_MS, ...data, end: Date.now() };
  setTask(task);
  return task;
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

  const csv = await json2csvAsync(data, {
    keys: ['start', 'end', 'description'],
  });

  return new Blob([csv], { type: 'text/plain;charset=utf-8' });
}
