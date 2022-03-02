import { useMemo } from 'react';

import { getAllTasks } from '@/services/taskStorage';
import { getTask, setTask, startTask, stopTask } from '@/services/taskStorage';

export const usePomoTask = () => {
  return useMemo(
    () => ({
      setTask,
      getTask,
      stopTask,
      startTask,
      getAllTasks,
    }),
    [],
  );
};
