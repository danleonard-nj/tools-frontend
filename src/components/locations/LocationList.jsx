import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import { LocationCard } from './LocationCard';

const LocationList = () => {
  const locations = useSelector((x) => x.location.locations) ?? [];
  const locationsLoading = useSelector((x) => x.location.locationsLoading);

  return locationsLoading ? (
    <Spinner />
  ) : (
    locations.map((location) => (
      <>
        <LocationCard location={location} /> <br />
      </>
    ))
  );
};

export { LocationList };
