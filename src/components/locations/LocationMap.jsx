import GoogleMapReact from 'google-map-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { queryLocations } from '../../store/locations/locationActions';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const LocationMap = () => {
  const dispatch = useDispatch();
  const defaultProps = {
    center: {
      lat: 33.5745223,
      lng: -111.9782943,
    },
    zoom: 11,
  };

  const onClick = (data) => {
    dispatch(queryLocations(data.lat, data.lng));
    console.log(data);
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '75vh', width: '100%' }}>
      <GoogleMapReact
        onClick={onClick}
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}>
        <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
      </GoogleMapReact>
    </div>
  );
};

export { LocationMap };
