import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import GeoLocation from './GeoLocation';

function Map({ position, interestClicked }) {
  const [latLng, setLatLng] = useState({
    lat: 40.7128,
    lng: -74.006,
    isLoaded: false,
  });

  return (
    <div className='w-full h-screen pt-10'>
      <MapContainer
        center={[latLng.lat, latLng.lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
        />
        <GeoLocation
          position={position}
          setLatLng={setLatLng}
          interestClicked={interestClicked}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
