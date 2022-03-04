import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import React, { Fragment } from 'react';

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
      {data.map((el, index) => {
        const { id, start, ended, title } = el;

        const handleStop = () => onStop(el);
        const handleStart = () => onStart(el);
        const handleRemove = () => onRemove(el);

        return (
          <Fragment key={id}>
            {index > 0 ? <Divider /> : null}
            <Box display="flex" flexDirection="row" alignItems="center">
              <IconButton onClick={handleRemove}>
                <DeleteOutlineIcon />
              </IconButton>

              <IconButton onClick={ended ? handleStart : handleStop}>
                {ended ? <PlayArrowIcon htmlColor="green" /> : <StopIcon htmlColor="red" />}
              </IconButton>

              {(start || ended) && (
                <>
                  {start && (
                    <Typography variant="body1" color="primary">
                      {new Date(start).toLocaleTimeString('es').slice(0, 5)}
                    </Typography>
                  )}
                  {ended && (
                    <Typography variant="body1" color="primary">
                      {' - '}
                    </Typography>
                  )}
                  {ended && (
                    <Typography variant="body1" color="primary">
                      {new Date(ended).toLocaleTimeString('es').slice(0, 5)}
                    </Typography>
                  )}
                </>
              )}

              <Box width={10} />

              <Box>
                <Typography variant="body1" color="primary">
                  {title}
                </Typography>
              </Box>
            </Box>
          </Fragment>
        );
      })}
    </Box>
  );
};

export default TasksList;
