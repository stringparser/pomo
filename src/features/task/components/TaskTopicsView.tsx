import { Box, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { TimerItem } from '@/models/Time';

const useStyles = makeStyles({
  chip: {
    marginTop: '1rem',
    marginLeft: '0.5rem',
    flexBasis: '15%',
  },
});

export type TasksTopicsViewProps = {
  items: TimerItem[];
  onSelect: (topic: TimerItem) => void;
};

const TasksTopicsView: React.FC<TasksTopicsViewProps> = ({ items, onSelect }) => {
  const classes = useStyles();

  const topics = items.reduce((acc: Record<string, TimerItem[]>, el) => {
    const topic = el.title;

    if (!topic) {
      return acc;
    }

    acc[topic] = (acc[topic] || []).concat(el);

    return acc;
  }, {});

  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" flexBasis="10%">
      {Object.entries(topics).map(([key, el]) => {
        const count = el.length;
        const label = count > 1 ? `${key} (${count})` : key;
        const handleSelect = () => onSelect(el[0]);

        return (
          <Chip
            key={key}
            size="medium"
            color="primary"
            label={label}
            clickable
            className={classes.chip}
            onClick={handleSelect}
          />
        );
      })}
    </Box>
  );
};

export default TasksTopicsView;
