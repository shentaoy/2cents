import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import { getPersistedTransactions } from '../../../transactions/storage';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { getMonthlyReport } from '../../../transactions/parser';
import { useReducer } from 'react';
import { initialReportState, reportReducer } from '../../../reducer/reportReducer';

const data = getPersistedTransactions();

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ ...rest }) => {
  const classes = useStyles();
  const month = rest.month;
  // const [orders] = useState(data);
  const [state, dispatch] = useReducer(reportReducer, initialReportState);
  const monthOrders = getMonthlyReport(data);
  const orders = monthOrders[month];
  console.log('orders')

  return (
    <Card
      className={clsx(classes.root)}
      {...rest}
    >
      <CardHeader title="Latest Orders" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Order Ref
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.transactions.map((transaction) => (
                <TableRow
                  hover
                  key={transaction.id}
                >
                  <TableCell>
                    {moment.utc(transaction.date, 'DD.MM.YY').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {transaction.name}
                  </TableCell>
                  <TableCell>
                    {transaction.amount}
                  </TableCell>
                  <TableCell>
                    {transaction.reference}
                  </TableCell>
                  <TableCell>
                    {transaction.category || ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
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
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
