import LocationApi from '../../api/locationApi';
import { popErrorMessage, popMessage } from '../alert/alertActions';
import { setLocations, setLocationsLoading } from './locationSlice';

export function queryLocations(latitude, longitude, miles, limit) {
  return async (dispatch, getState) => {
    miles ??= 10;
    limit ??= 10;

    dispatch(setLocationsLoading(true));

    const api = new LocationApi();

    dispatch(popMessage('Querying location...'));

    const query = {
      latitude: latitude,
      longitude: longitude,
      limit: limit,
      range: miles,
      include_timestamps: true,
    };

    const locations = await api.query(query);

    if (locations.status !== 200) {
      const errorMessage = locations.data?.message;
      dispatch(
        popErrorMessage(
          `Failed to query location: ${errorMessage ?? 'Exception occured'}`
        )
      );
    } else {
      dispatch(popMessage('Location data fetched successfully!'));
      dispatch(setLocations(locations.data));
    }
  };
}
