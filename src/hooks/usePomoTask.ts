import { useMemo } from 'react';

import { getTask, setTask } from '@/services/taskStorage';

import { getAllTasks } from './../services/taskStorage';

export const usePomoTask = () => {
  return useMemo(
    () => ({
      setTask,
      getTask,
      getAllTasks,
    }),
    [],
  );
};
