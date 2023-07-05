import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import { Avatar, Divider, Skeleton, List, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
const { Buffer } = require('buffer');

const { io } = require('socket.io-client');
const socket = io('ws://localhost:3333');

/*
[] TODO: Map over all the users groups and populate the menu. 
[] TODO: For each menu, populate the following sub navigations: 
    [] Chat
    [] Calendar
    [] Members

*/

const { TextArea } = Input;

function MessageBoard({ groupId, userData }) {
  const [message, setMessage] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [allMembers, setAllMembers] = useState(null);

  async function getAllMessages(groupId) {
    const { data: groupMessages } = await axios(
      `/group/getMessages/${groupId}`
    );
    const messages = [];
    const members = {};

    for (let i = 0; i < groupMessages.length; i++) {
      let message = groupMessages[i];
      const parsed = JSON.parse(message);
      const key = Object.keys(parsed)[0];
      if (!members[key]) {
        const { data: member } = await axios.get(`/group/getMember/${key}`);
        members[key] = member[0];
      }
      messages.push(parsed);
    }
    setAllMessages(messages.reverse());
    setAllMembers(members);
  }

  useEffect(() => {
    socket.emit('joinRoom', `GroupChat-${groupId}`);

    socket.on('response', (data) => {
      const groupId = data.message.groupId;
      getAllMessages(groupId);
    });

    getAllMessages(groupId);
    // Unsubscribe from the 'joinRoom' event when the component unmounts
    return () => {
      socket.off('response');
    };
  }, [groupId]);

  async function sendMessage(groupId) {
    try {
      const information = {
        userid: userData.id,
        groupid: groupId,
        message: message,
      };
      const { data } = await axios.patch('/group/postMessage', information);
      socket.emit('message', {
        room: `GroupChat-${groupId}`,
        message: data,
      });
      clearMessage();
    } catch (error) {
      console.log(error);
    }
  }

  function clearMessage() {
    setMessage('');
  }

  function getAvatarSrc(item) {
    const memberId = Object.keys(item)[0];
    const person = allMembers[memberId];
    const photo = Buffer.from(person.photo).toString('utf-8');
    const dataURI = `data:image/png;base64,${photo}`;
    return dataURI;
  }

  const chatBox = (
    <div className='flex flex-col w-full space-y-4'>
      <div
        id='scrollableDiv'
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        {allMessages && Object.keys(allMembers).length && (
          <InfiniteScroll
            dataLength={50}
            hasMore={20 < 50}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={allMessages}
              renderItem={(item) => (
                <List.Item key={'special'}>
                  <List.Item.Meta
                    avatar={<Avatar src={getAvatarSrc(item)} />}
                    description={Object.values(item)}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        )}
      </div>
      <TextArea
        rows={4}
        placeholder='Enter your message here'
        onPressEnter={() => {
          sendMessage(groupId);
        }}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        value={message}
      />
      <Button
        style={{ background: 'white', borderColor: 'grey' }}
        onClick={() => {
          sendMessage(groupId);
        }}
      >
        Send
      </Button>
    </div>
  );
  return chatBox;
}

export default MessageBoard;
