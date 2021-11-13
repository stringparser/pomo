import { useMemo } from 'react';

import { getAllTasks } from '@/services/taskStorage';
import { getTask, setTask } from '@/services/taskStorage';

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
