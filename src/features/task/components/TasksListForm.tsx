import { Box, Paper } from '@material-ui/core';
import React from 'react';

import AddTimeForm from '@/features/task/components/AddTimeForm';
import TasksList, { TasksListProps } from '@/features/task/components/TasksList';
import { TimerItem } from '@/models/Time';

export type TasksListFormProps = TasksListProps & {
  onChange: () => void;
};

const TasksListForm: React.FC<TasksListFormProps> = ({ onChange, ...rest }) => {
  return (
    <>
      <AddTimeForm onChange={onChange} />
      <Box height={20} />
      <Paper square>
        <TasksList {...rest} />
      </Paper>
    </>
  );
};

export default TasksListForm;
