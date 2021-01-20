import React, { useReducer } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { getPersistedTransactions } from '../../../transactions/storage';
import { getSalesData } from '../../../transactions/parser';
import {initialReportState, reportReducer, ActionType} from '../../../reducer/reportReducer';

const useStyles = makeStyles(() => ({
  root: {}
}));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Sales = ({ ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const persistedTransactions = getPersistedTransactions();
  const salesData = getSalesData(persistedTransactions);

  const [_, dispatch] = useReducer(reportReducer, initialReportState);
  const setMonth = rest.setMonth;

  const data = {
    datasets: [
      {
        backgroundColor: colors.red[300],
        data: salesData.fixedArr.slice(Math.max(salesData.fixedArr.length - 12, 0)),
        label: 'Fixed'
      },
      {
        backgroundColor: colors.orange[200],
        data: salesData.nonFixedArr.slice(Math.max(salesData.nonFixedArr.length - 12, 0)),
        label: 'Non Fixed'
      },
      {
        backgroundColor: colors.indigo[500],
        data: salesData.savingArr.slice(Math.max(salesData.savingArr.length - 12, 0)),
        label: 'Saving'
      }
    ],
    labels: salesData.labelArr.slice(Math.max(salesData.labelArr.length - 12, 0)),
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    onClick: (event: any, elements: { _chart: any; }[]) => {
      const chart = elements[0]._chart;
      const element = chart.getElementAtEvent(event)[0];
      const dataset = chart.data.datasets[element._datasetIndex];
      const xLabel = chart.data.labels[element._index];
      const value = dataset.data[element._index];
      console.log(dataset.label + " at " + xLabel + ": " + value);
      setMonth(xLabel);
      // dispatch({type: ActionType.SELECT_MONTH_ACTION, payload: xLabel})
    },
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card
      className={clsx(classes.root)}
      {...rest}
    >
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon />}
            size="small"
            variant="text"
          >
            Last 7 days
          </Button>
        )}
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
