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
  const [isIdle, setIsIdle] = useState(true);
  const [description, setTaskDescription] = useState(label);

  const handleStartTask = useCallback(() => {
    if (description == null) {
      alert('tarea no definida aún');
      return;
    }

    const value = pomo.startTask({ ...task, description });
    setTask(value);

    onChange();
  }, [task, onChange]);

  const handleStopTask = useCallback(() => {
    if (task == null) {
      return;
    }

    const value = pomo.stopTask(task);

    setTask(value);
    setIsIdle(true);

    onChange();
  }, [task, onChange]);

  const handleContinueTask = useCallback(() => {
    setIsIdle(false);
  }, []);

  const handleTaskLabelChange = useCallback((ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = ev.currentTarget;

    setTask(pomo.getTask(value));
    setTaskDescription(value);
  }, []);

  if (task == null || isIdle) {
    return (
      <FormControl size="medium">
        <OutlinedInput
          value={description}
          placeholder="descripción"
          endAdornment={
            <Button variant="outlined" onClick={task ? handleContinueTask : handleStartTask}>
              {task ? 'continuar' : 'empezar'}
            </Button>
          }
          onChange={handleTaskLabelChange}
        />
      </FormControl>
    );
  }

  return (
    <Button variant="contained" onClick={handleStopTask}>
      {`parar`}
    </Button>
  );
};

export default TimerTask;
