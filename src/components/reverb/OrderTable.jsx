import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Button,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatCurrency,
  formatDate,
  isShipButtonDisabled,
} from '../../api/helpers/reverbHelpers';
import { dialogType, openDialog } from '../../store/dialog/dialogSlice';
import {
  initialOrderDetail,
  updateOrderDetail,
  setSelectedOrder,
} from '../../store/reverb/reverbSlice';

export default function OrderTable() {
  const dispatch = useDispatch();
  const orders = useSelector((x) => x.reverb.orders);

  const handleShip = (order) => {
    dispatch(setSelectedOrder(order));
    dispatch(updateOrderDetail(initialOrderDetail));
    dispatch(openDialog(dialogType.orderDetail));
  };

  const OrderTableRow = ({ order }) => {
    return (
      <TableRow id={`reverb-table-row-id-${order.order_id}`}>
        <TableCell>{order.order_number}</TableCell>
        <TableCell>{order.order_status}</TableCell>
        <TableCell>{order.product}</TableCell>
        <TableCell>{formatDate(order.paid_date)}</TableCell>
        <TableCell>{order.shipment_status}</TableCell>
        <TableCell>{formatDate(order.ship_date)}</TableCell>
        <TableCell>{order.shipping_provider}</TableCell>
        <TableCell>{order.shipping_code}</TableCell>
        <TableCell>{formatCurrency(order.subtotal)}</TableCell>
        <TableCell>{formatDate(order.created_date)}</TableCell>
        <TableCell>
          <Button
            id={`reverb-order-table-row-id-${order.order_id}-ship-button`}
            disabled={isShipButtonDisabled(order)}
            onClick={() => handleShip(order)}>
            Ship
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <TableContainer component={Paper} id='reverb-order-table-container'>
      <Table sx={{ border: 'none' }} size='small' id='reverb-order-table'>
        <TableHead id='reverb-order-table-head'>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Paid Date</TableCell>
            <TableCell>Shipment Status</TableCell>
            <TableCell>Ship Date</TableCell>
            <TableCell>Shipment Carrier</TableCell>
            <TableCell>Shipment Tracking</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody id='reverb-order-table-body'>
          {orders?.length &&
            orders.map((order) => <OrderTableRow order={order} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
