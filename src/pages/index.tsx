import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import React from 'react';

import { Layout } from '@/components/Layout';

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

  return (
    <Layout>
      <div className={classes.root}>
        <Head>
          <title>pomo</title>
        </Head>
        <div className={classes.strip}>
          <Typography variant="body1" color="primary">
            Nada que ver por aquí
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
