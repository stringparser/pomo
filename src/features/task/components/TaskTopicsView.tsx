import { Box, Chip } from '@material-ui/core';
import React from 'react';

import { TimerItem } from '@/models/Time';

export type TasksTopicsViewProps = {
  items: TimerItem[];
  onSelect: (topic: TimerItem) => void;
};

const TasksTopicsView: React.FC<TasksTopicsViewProps> = ({ items, onSelect }) => {
  const topics = items.reduce((acc: Record<string, TimerItem[]>, el) => {
    const topic = el.description;

    if (!topic) {
      return acc;
    }

    acc[topic] = (acc[topic] || []).concat(el);

    return acc;
  }, {});

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {Object.entries(topics).map(([key, el]) => {
        const count = el.length;
        const label = count > 1 ? `${key} (${count})` : key;
        const handleSelect = () => onSelect(el[0]);

        return <Chip key={key} label={label} clickable color="primary" onClick={handleSelect} data-topic={key}></Chip>;
      })}
    </Box>
  );
};

export default TasksTopicsView;
