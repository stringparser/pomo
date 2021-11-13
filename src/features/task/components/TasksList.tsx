import { Box, Typography } from '@material-ui/core';
import React from 'react';

import { TimerItem } from '@/models/Time';

export type TimerTaskProps = {
  data: TimerItem[];
};

const TasksList: React.FC<TimerTaskProps> = ({ data }) => {
  if (data == null || data.length === 0) {
    return (
      <Box display="flex" alignItems="center" flexDirection="row">
        <Typography variant="body1">no tasks yet</Typography>
      </Box>
    );
  }

  console.log('data', data);

  return (
    <Box flexDirection="column" justifyContent="center">
      {data.map(({ label, start, end }) => {
        return (
          <Box key={label} display="flex" flexDirection="row" alignItems="center">
            <Box width={100}>
              <Typography variant="body1" color="primary">
                {label}
              </Typography>
            </Box>

            <Box width={10} />

            <Typography variant="body1" color="primary">
              start: {start ? new Date(start).toLocaleTimeString('es') : null}
            </Typography>

            <Box width={10} />

            <Typography variant="body1" color="primary">
              end: {end ? new Date(end).toLocaleTimeString('es') : null}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default TasksList;
