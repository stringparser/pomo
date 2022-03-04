import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import React, { Fragment } from 'react';

import { TimerItem } from '@/models/Time';

export type TasksListProps = {
  data: TimerItem[];
  onEdit: (el: TimerItem) => void;
  onStop: (el: TimerItem) => void;
  onStart: (el: TimerItem) => void;
  onRemove: (el: TimerItem) => void;
};

const TasksList: React.FC<TasksListProps> = ({ data, onEdit, onStart, onStop, onRemove }) => {
  if (data == null || data.length === 0) {
    return null;
  }

  return (
    <Box flexDirection="column" justifyContent="center">
      {data.map((el, index) => {
        const { id, start, ended, title } = el;

        const handleStop = () => onStop(el);
        const handleEdit = () => onEdit(el);
        const handleStart = () => onStart(el);
        const handleRemove = () => onRemove(el);

        return (
          <Fragment key={id}>
            {index > 0 ? <Divider /> : null}
            <Box display="flex" flexDirection="row" alignItems="center">
              <IconButton onClick={handleRemove}>
                <DeleteOutlineIcon />
              </IconButton>

              <IconButton onClick={handleEdit}>
                <EditOutlinedIcon />
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
