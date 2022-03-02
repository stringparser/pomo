import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import React from 'react';

import { layoutWidthStyles } from '@/components/Layout/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      color: '#fff',
    },
    toolbar: theme.mixins.toolbar,
    navbarContent: {
      ...layoutWidthStyles,
      margin: '0 auto',
    },
    content: {
      flexGrow: 1,
    },
    menuItem: {
      color: '#fff',
    },
  }),
);

export type LayoutProps = {
  title: string;
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container?: Element;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { title } = props;
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>pomo</title>
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Box className={classes.navbarContent}>
              <Typography variant="h6" noWrap>
                {title}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </>
  );
};
