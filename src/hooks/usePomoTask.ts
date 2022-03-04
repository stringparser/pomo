import { useMemo } from 'react';

import { getAllTasks } from '@/services/taskStorage';
import { createCSVExport, getTask, removeTask, setTask, startTask, stopTask } from '@/services/taskStorage';

export const usePomoTask = () => {
  return useMemo(
    () => ({
      setTask,
      getTask,
      stopTask,
      startTask,
      removeTask,
      getAllTasks,
      createCSVExport,
    }),
    [],
  );
};
