import { Button, FormControl, OutlinedInput } from '@material-ui/core';
import React, { useCallback, useState } from 'react';

import { usePomoTask } from '@/hooks/usePomoTask';
import { noop } from '@/lib/util';

export type TimerTaskButtonProps = {
  label?: string;
  onChange?: () => void;
};

const TimerTask: React.FC<TimerTaskButtonProps> = ({ label, onChange = noop }) => {
  const pomo = usePomoTask();

  const [task, setTask] = useState(label ? pomo.getTask(label) : undefined);
  const [isOpen, setOpen] = useState(false);
  const [description, setTaskDescription] = useState(label);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleStartTask = useCallback(() => {
    if (description == null) {
      alert('tarea no definida aún');
      return;
    }

    setOpen(false);

    const value = pomo.startTask({ ...task, description });
    setTask(value);

    onChange();
  }, [task, description, onChange]);

  const handleTaskDescriptionChange = useCallback((ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = ev.currentTarget;

    setTaskDescription(value);
  }, []);

  if (!isOpen) {
    return (
      <Button variant="outlined" onClick={handleOpen}>
        añadir tarea
      </Button>
    );
  }

  return (
    <FormControl size="medium">
      <OutlinedInput
        value={description}
        placeholder="descripción"
        endAdornment={
          <Button variant="outlined" onClick={handleStartTask}>
            añadir
          </Button>
        }
        onChange={handleTaskDescriptionChange}
      />
    </FormControl>
  );
};

export default TimerTask;
