import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';

import { Layout } from '@/components/Layout/Layout';
import TasksList from '@/features/task/components/TasksList';
import TimerTask from '@/features/task/components/TimerTask';
import { usePomoTask } from '@/hooks/usePomoTask';
import { TimerItem } from '@/models/Time';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 64px)',
    position: 'relative',
    margin: '2rem',
  },
  strip: {
    height: '100%',
    marginTop: 30,
    marginBottom: 30,
  },
  taskButton: {
    marginTop: 20,
  },
}));

const Index: React.FC = () => {
  const classes = useStyles();

  const pomo = usePomoTask();
  const [tasks, setTasks] = useState(pomo.getAllTasks());
  const [changeCount, setChangeCount] = useState(0);

  const handleUpdateTasks = useCallback(() => {
    setChangeCount((value) => value + 1);
  }, []);

  useEffect(() => {
    setTasks(pomo.getAllTasks());
  }, [changeCount]);

  const handleStop = useCallback((el: TimerItem) => {
    pomo.stopTask(el);
    handleUpdateTasks();
  }, []);

  const handleStart = useCallback((el: TimerItem) => {
    pomo.startTask(el);
    handleUpdateTasks();
  }, []);

  return (
    <Layout title="Lista de actividades">
      <div className={classes.root}>
        <Head>
          <title>pomo</title>
        </Head>
        <div className={classes.strip}>
          <Box className={classes.taskButton}>
            <TimerTask onChange={handleUpdateTasks} />
          </Box>
          <Box height={20} />
          <TasksList data={tasks} onStart={handleStart} onStop={handleStop} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
