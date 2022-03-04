import { Box, Typography } from '@material-ui/core';
import React from 'react';

import { TimerItem } from '@/models/Time';

export type TimerTaskProps = {
  data: TimerItem[];
  onStop: (el: TimerItem) => void;
  onStart: (el: TimerItem) => void;
  onRemove: (el: TimerItem) => void;
};

const TasksList: React.FC<TimerTaskProps> = ({ data, onStart, onStop, onRemove }) => {
  if (data == null || data.length === 0) {
    return (
      <Box display="flex" alignItems="center" flexDirection="row">
        <Typography variant="body1" color="primary">
          No hay tareas aún.
        </Typography>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" justifyContent="center">
      {data.map((el) => {
        const { id, start, end, description } = el;

        const handleStop = () => onStop(el);
        const handleStart = () => onStart(el);
        const handleRemove = () => onRemove(el);

        return (
          <Box key={id} display="flex" flexDirection="row" alignItems="center">
            <Box style={{ cursor: 'pointer' }} marginRight={2} onClick={handleRemove}>
              <Typography color="primary">X</Typography>
            </Box>

            {!end && (
              <Box style={{ cursor: 'pointer' }} onClick={handleStop}>
                <Typography color="error">&#9632;</Typography>
              </Box>
            )}
            {end && (
              <Box style={{ cursor: 'pointer' }} onClick={handleStart}>
                <Typography color="secondary">&#9658;</Typography>
              </Box>
            )}

            <Box width={10} />

            {(start || end) && (
              <>
                {start && (
                  <Typography variant="body1" color="primary">
                    {new Date(start).toLocaleTimeString('es').slice(0, 5)}
                  </Typography>
                )}
                {end && (
                  <Typography variant="body1" color="primary">
                    {' - '}
                  </Typography>
                )}
                {end && (
                  <Typography variant="body1" color="primary">
                    {new Date(end).toLocaleTimeString('es').slice(0, 5)}
                  </Typography>
                )}
              </>
            )}

            <Box width={10} />

            <Box maxWidth="33%">
              <Typography variant="body1" color="primary">
                {description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default TasksList;
