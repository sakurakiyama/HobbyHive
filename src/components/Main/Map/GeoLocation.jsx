import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import L from 'leaflet';
import axios from 'axios';

function GeoLocation({ position: { address } }) {
  const map = useMap();

  const markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  useEffect(() => {
    if (!address) return;

    async function getLocation() {
      try {
        const location = encodeURI(address);
        const { data } = await axios(
          `https://nominatim.openstreetmap.org/search.php?q=${location}&polygon_geojson=1&format=jsonv2`,
          {
            headers: {
              Accept: '*/*',
            },
          }
        );

        const result = data[0];
        L.marker([result.lat, result.lon], { icon: markerIcon })
          .addTo(map)
          .bindPopup(result.display_name);
        map.panTo(new L.LatLng(result.lat, result.lon));
      } catch (error) {
        console.log(error);
      }
    }
    getLocation();
  }, [address]);

  return null;
}

export default GeoLocation;
