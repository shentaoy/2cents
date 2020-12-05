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

const data = getPersistedTransactions();

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);

  return (
    <Card
      className={clsx(classes.root, className)}
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
              {orders.map((transaction) => (
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
