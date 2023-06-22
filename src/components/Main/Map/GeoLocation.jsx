import { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import L from 'leaflet';
import axios from 'axios';
import { Button } from 'antd';
import { Modal } from '@mui/base';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  zIndex: 1200,
};

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

function GeoLocation({
  position: { address },
  interestClicked,
  allInterests,
  userData,
}) {
  const map = useMap();
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [joinButton, setJoinButton] = useState(null);
  const [userGroups, setUserGroups] = useState(null);

  const navigate = useNavigate();

  // Closes the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Opens the modal and updates state so relevant information can be displayed
  function handleOpen(key) {
    const current = groups.find((obj) => obj.id === key);
    if (!userGroups) {
      setJoinButton('Join group');
    } else {
      const joined = userGroups.find((obj) => obj.group_id === current.id);
      if (joined) {
        setJoinButton('Go to my groups');
      } else {
        setJoinButton('Join group');
      }
    }
    setSelectedGroup(current);
    setOpen(true);
  }

  // Join a group
  async function joinGroup(groupID, interestID) {
    try {
      if (joinButton === 'Join group') {
        const info = {
          groupID: groupID,
          userID: userData.id,
        };
        const { data } = await axios.put(`/group/joinGroup`, info);

        if (data) {
          setJoinButton('Go to my groups');
        }
      }
      if (joinButton === 'Go to my groups') {
        navigate('/groups');
      }
      // TODO: Add logic to display error if could not join.
    } catch (error) {
      console.log(error);
    }
  }

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

        map.panTo(new L.LatLng(result.lat, result.lon));
        setGroups(response);
      } catch (error) {
        console.log(error);
      }
    }
    getLocation();

    // Get the users groups
    async function getUserGroups() {
      try {
        const { data } = await axios(`/user/getUserGroups/${userData.id}`);
        setUserGroups(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserGroups();
  }, [address, interestClicked]);

  return (
    <>
      <div
        onClick={handleClose}
        className={
          open
            ? 'w-screen h-screen top-0 fixed bg-black opacity-30 backdrop-blur-sm backdrop-filter backdrop-saturate-150 z-[1200]'
            : ''
        }
      ></div>
      {groups &&
        // Generate markers for each returned group.
        // TODO: Clear markers when new location is entered.
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
                <div className='text-center'>
                  <p>{element.groupname}</p>
                  <Button
                    style={{ background: 'white', borderColor: 'grey' }}
                    onClick={() => handleOpen(element.id)}
                  >
                    View Group
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {selectedGroup && (
            <div className='mt-1 space-y-4 text-center'>
              <p> {selectedGroup.groupname}</p>
              <p>{selectedGroup.description}</p>
              <p>Founded on: {formatDate(selectedGroup.created_at)}</p>
              <Button
                style={{ background: 'white', borderColor: 'grey' }}
                onClick={() =>
                  joinGroup(selectedGroup.id, selectedGroup.interest_id)
                }
              >
                {joinButton}
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default GeoLocation;
