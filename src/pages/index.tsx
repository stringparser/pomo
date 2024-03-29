import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import React, { useCallback, useState } from 'react';

import { Layout } from '@/components/Layout/Layout';
import DataSync from '@/features/data/DataSync';
import TasksListForm from '@/features/task/components/TasksListForm';
import TasksTopicsView from '@/features/task/components/TaskTopicsView';
import { usePomoTask } from '@/hooks/usePomoTask';
import { TimerItem } from '@/models/Time';

enum TabViewIndex {
  list = 0,
  topics = 1,
  dataSync = 2,
}

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 64px)',
    position: 'relative',
    margin: '2rem',
  },
  strip: {
    height: '100%',
    margin: '0 auto',
    maxWidth: '720px',
  },
  taskButton: {
    marginTop: 20,
  },
}));

const Index: React.FC = () => {
  const classes = useStyles();

  const pomo = usePomoTask();
  const [tasks, setTasks] = useState(pomo.getAllTasks());
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleUpdateTasks = useCallback(() => {
    setTasks(pomo.getAllTasks());
  }, []);

  const handleTabIndexChange = useCallback((_ev: React.ChangeEvent<any>, value: number) => {
    setTabIndex(value);
  }, []);

  const handleStop = useCallback((el: TimerItem) => {
    pomo.stopTask(el);
    handleUpdateTasks();
  }, []);

  const handleStart = useCallback((el: Partial<TimerItem>) => {
    pomo.startTask(el);

    handleUpdateTasks();
  }, []);

  const handleSelectTopic = useCallback((el: TimerItem) => {
    handleStart(el);
    setTabIndex(0);
  }, []);

  const handleRemove = useCallback((el: TimerItem) => {
    pomo.removeTask(el);
    handleUpdateTasks();
  }, []);

  return (
    <Layout title="Diario">
      <div className={classes.root}>
        <div className={classes.strip}>
          <Paper square>
            <Tabs
              value={tabIndex}
              onChange={handleTabIndexChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon tabs example"
            >
              <Tab icon={<ListIcon />} aria-label="list" />
              <Tab icon={<ViewModuleIcon />} aria-label="icons" />
              <Tab icon={<SyncAltIcon />} aria-label="sync" />
            </Tabs>
          </Paper>
          <Box height={20} />
          {tabIndex === TabViewIndex.list && (
            <TasksListForm
              items={tasks}
              onStop={handleStop}
              onStart={handleStart}
              onRemove={handleRemove}
              onChange={handleUpdateTasks}
            />
          )}

          {tabIndex === TabViewIndex.topics && <TasksTopicsView items={tasks} onSelect={handleSelectTopic} />}

          {tabIndex === TabViewIndex.dataSync && <DataSync />}

          {tabIndex > TabViewIndex.dataSync && (
            <Typography variant="body1" color="primary">
              tab {tabIndex}
            </Typography>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
