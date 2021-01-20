import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import Sales from './Sales';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import { useReducer } from 'react';
import { initialReportState, reportReducer } from '../../../reducer/reportReducer';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Dashboard = (props: any) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reportReducer, initialReportState);
  const [month, setMonth] = useState('2020-12');
  console.log('index')
  return (
    <Page className={classes.root} title="Dashboard" {...props}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit />
          </Grid>
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <Sales setMonth={setMonth}/>
          </Grid>

          <Grid item lg={3} md={6} xl={3} xs={12}>
            <TrafficByDevice />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders month={month}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
