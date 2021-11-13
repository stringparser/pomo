import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';

import { Layout } from '@/components/Layout/Layout';
import TasksList from '@/features/task/components/TasksList';
import TimerTask from '@/features/task/components/TimerTask';
import { usePomoTask } from '@/hooks/usePomoTask';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 64px)',
    position: 'relative',
    margin: '1rem 2rem',
  },
  strip: {
    height: '100%',
    paddingTop: 30,
    paddingBottom: 30,
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

  return (
    <Layout title="Lista de actividades">
      <div className={classes.root}>
        <Head>
          <title>pomo</title>
        </Head>
        <div className={classes.strip}>
          <TasksList data={tasks} />
          <Box className={classes.taskButton}>
            <TimerTask onChange={handleUpdateTasks} />
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
