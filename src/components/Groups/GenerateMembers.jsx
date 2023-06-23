import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from 'antd';
const { Buffer } = require('buffer');

function GenerateMembers({ groupId }) {
  const [groupMembers, setGroupMembers] = useState(null);

  useEffect(() => {
    async function getMembers() {
      const { data: members } = await axios.get(`/group/getMembers/${groupId}`);
      setGroupMembers(members);
    }
    getMembers();
  }, [groupId]);

  return (
    <>
      {groupMembers &&
        groupMembers.map((user) => {
          const photo = Buffer.from(user.photo).toString('utf-8');
          const dataURI = `data:image/png;base64,${photo}`;
          return (
            <div className='m-1'>
              <Avatar size={75} src={dataURI} />
            </div>
          );
        })}
    </>
  );
}

export default GenerateMembers;
