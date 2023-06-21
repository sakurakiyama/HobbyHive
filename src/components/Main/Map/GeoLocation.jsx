import { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import L from 'leaflet';
import axios from 'axios';

function GeoLocation({ position: { address }, interestClicked, allInterests }) {
  const map = useMap();
  const [groups, setGroups] = useState([]);

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
        // setPanTo(result);

        const response = await getGroups(
          interestClicked,
          result.lat,
          result.lon
        );

        map.panTo(new L.LatLng(result.lat, result.lon));
        setGroups(response);
        // Generate markers for each returned group.
        // TODO: Clear markers when new location is entered.
      } catch (error) {
        console.log(error);
      }
    }
    getLocation();
  }, [address, interestClicked]);

  return (
    <>
      {groups &&
        groups.map((element) => {
          const interestId = element.interest_id;
          const interestObject = allInterests.find(
            (obj) => obj.id === interestId
          );

          const markerIcon = L.icon({
            iconUrl: interestObject.icon,
            iconSize: [40, 40],
          });

          return (
            <Marker
              position={[element.lat, element.lon]}
              icon={markerIcon}
              key={element.id}
            >
              <Popup>
                <div>
                  <p>{element.groupname}</p>
                  <button>Click me</button>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </>
  );
}

export default GeoLocation;
