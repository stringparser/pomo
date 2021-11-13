import { Button, FormControl, OutlinedInput } from '@material-ui/core';
import React, { useCallback, useState } from 'react';

import { usePomoTask } from '@/hooks/usePomoTask';
import { noop } from '@/lib/util';
import { TimerItem } from '@/models/Time';

export type TimerTaskButtonProps = {
  label?: string;
  onChange?: () => void;
};

const TimerTask: React.FC<TimerTaskButtonProps> = ({ label, onChange = noop }) => {
  const pomo = usePomoTask();

  const [task, setTask] = useState(label ? pomo.getTask(label) : undefined);
  const [isIdle, setIsIdle] = useState(true);
  const [taskLabel, setTaskLabel] = useState(label);

  const handleStartTask = useCallback(() => {
    if (!taskLabel) {
      alert('Necesitamos un nombre antes de empezar');
      return;
    }

    const value: TimerItem = { label: taskLabel, start: Date.now() };

    setTask(value);
    pomo.setTask(value);

    onChange();
  }, [taskLabel, onChange]);

  const handleStopTask = useCallback(() => {
    if (task == null) {
      return;
    }

    const value: TimerItem = { ...task, end: Date.now() };

    setTask(value);
    setIsIdle(true);
    pomo.setTask(value);

    onChange();
  }, [task, onChange]);

  const handleContinueTask = useCallback(() => {
    setIsIdle(false);
  }, []);

  const handleTaskLabelChange = useCallback((ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = ev.currentTarget;

    setTask(pomo.getTask(value));
    setTaskLabel(value);
  }, []);

  if (task == null || isIdle) {
    return (
      <FormControl size="medium">
        <OutlinedInput
          value={taskLabel}
          placeholder="nombre"
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
      {`parar de ${task.label}`}
    </Button>
  );
};

export default TimerTask;
