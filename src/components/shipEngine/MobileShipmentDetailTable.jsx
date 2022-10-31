import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

export const MobileShipmentDetailTable = ({ shipment }) => {
  return (
    <Table size='small'>
      <TableBody>
        <TableRow>
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>Service Code</TableCell>
          <TableCell>{shipment?.service_code}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Created Date</TableCell>
          <TableCell>{shipment?.created_date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ship Date</TableCell>
          <TableCell>{shipment?.ship_date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell>{shipment?.shipment_status}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
