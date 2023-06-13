import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import L from 'leaflet';
import axios from 'axios';

function GeoLocation({ position: { address }, interestClicked, allInterests }) {
  const map = useMap();

  let markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [40, 40],
  });

  // Function to get all groups of specified interests within one mile of the search paramater
  async function getGroups(interests, lat, lon) {
    const queryData = {
      latitude: lat,
      longitude: lon,
      interests: [],
    };

    for (const key in interests) {
      if (!interests[key]) {
        queryData['interests'].push(key);
      }
    }

    // If there are any selected interests, find the potential groups
    if (queryData.interests.length) {
      const { data } = await axios.get('/group/getGroups', {
        params: queryData,
      });
      return data;
    }

    // Otherwise, return undefined.
    return;
  }

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

        const response = await getGroups(
          interestClicked,
          result.lat,
          result.lon
        );

        // Generate markers for each returned group.
        // TODO: Clear markers when new location is entered.

        // If the response is not undefined, interests were selected.
        if (response) {
          response.forEach((element) => {
            const interestId = element.interest_id;
            const interestObject = allInterests.find(
              (obj) => obj.id === interestId
            );
            markerIcon = L.icon({
              iconUrl: interestObject.icon,
              iconSize: [40, 40],
            });

            L.marker([element.lat, element.lon], { icon: markerIcon })
              .addTo(map)
              .bindPopup(element.groupname);
          });
        }
        map.panTo(new L.LatLng(result.lat, result.lon));
      } catch (error) {
        console.log(error);
      }
    }
    getLocation();
  }, [address, interestClicked]);

  return null;
}

export default GeoLocation;
