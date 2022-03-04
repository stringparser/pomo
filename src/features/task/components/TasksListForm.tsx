import { Box } from '@material-ui/core';
import React from 'react';

import AddTimeForm from '@/features/task/components/AddTimeForm';
import TasksList from '@/features/task/components/TasksList';
import { TimerItem } from '@/models/Time';

export type TasksListFormProps = {
  items: TimerItem[];
  onStop: (el: TimerItem) => void;
  onStart: (el: TimerItem) => void;
  onRemove: (el: TimerItem) => void;
  onChange: () => void;
};

const TasksListForm: React.FC<TasksListFormProps> = ({ items, onStart, onStop, onChange, onRemove }) => {
  return (
    <>
      <AddTimeForm onChange={onChange} />
      <Box height={20} />
      <TasksList data={items} onStart={onStart} onStop={onStop} onRemove={onRemove} />
    </>
  );
};

export default TasksListForm;
