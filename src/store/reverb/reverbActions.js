import ReverbApi from '../../api/reverbApi';
import {
  setCreatedShipment,
  setCreatedShipmentLoading,
  setOrders,
} from './reverbSlice';

export function getOrders(pageNumber) {
  return async (dispatch, getState) => {
    const api = new ReverbApi();

    const orders = await api.getOrders(pageNumber);
    dispatch(setOrders(orders?.orders));
  };
}

export function createOrderShipment() {
  return async (dispatch, getState) => {
    const state = getState();
    const api = new ReverbApi();
    dispatch(setCreatedShipmentLoading(true));

    const orderDetail = state.reverb.orderDetail;
    const orderNumber = state.reverb.selectedOrder?.order_number;

    const response = await api.createOrderShipment(orderNumber, orderDetail);
    dispatch(setCreatedShipment(response?.shipment?.response?.shipment_id));
  };
}
