import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  OutlinedInput,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';

import { TimerItem } from '@/models/Time';

export type TaskEditDialogProps = DialogProps & {
  data: TimerItem;
};

const TaskEditDialog: React.FC<TaskEditDialogProps> = ({ data, ...rest }) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.content);

  const handleTitleChange = useCallback(
    (ev: any) => {
      setTitle(ev.target.value);
    },
    [title],
  );

  const handleDescriptionChange = useCallback(
    (ev: any) => {
      setDescription(ev.target.value);
    },
    [description],
  );

  return (
    <Dialog {...rest}>
      <DialogTitle>
        <OutlinedInput value={title} onChange={handleTitleChange} />
      </DialogTitle>
      <DialogContent>
        <OutlinedInput value={description} onChange={handleDescriptionChange} />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskEditDialog;
