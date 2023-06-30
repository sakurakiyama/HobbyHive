import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import { Divider, Skeleton, List, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

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

  useEffect(() => {
    socket.emit('joinRoom', `GroupChat-${groupId}`);

    socket.on('response', (data) => {
      const groupId = data.message.groupId;
      async function getAllMessages() {
        const { data: groupMessages } = await axios(
          `/group/getMessages/${groupId}`
        );
        const messages = [];
        const members = {};
        groupMessages.forEach((message) => {
          const parsed = JSON.parse(message);
          const key = Object.keys(parsed);
          if (!members[key]) {
            async function getMember() {
              const { data: member } = await axios.get(
                `/group/getMember/${key}`
              );
              members[key] = member;
            }

            getMember();
          }
          messages.push(parsed);
        });
        console.log(members);
        console.log(messages);
        setAllMessages(messages);
        setAllMembers(members);
      }
      getAllMessages();
    });
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
    } catch (error) {
      console.log(error);
    }
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
        {allMessages && (
          <InfiniteScroll
            dataLength={50}
            // next={loadMoreData}
            hasMore={20 < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={allMessages}
              renderItem={(item) => (
                <List.Item key={'special'}>
                  <List.Item.Meta
                    // avatar={<Avatar src={item.picture.large} />}
                    description={'test'}
                  />
                  <div>{Object.values(item)}</div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        )}
      </div>
      <TextArea
        rows={4}
        placeholder='Enter your message here'
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button
        style={{ background: 'white', borderColor: 'grey' }}
        onClick={() => sendMessage(groupId)}
      >
        Send
      </Button>
    </div>
  );
  return chatBox;
}

export default MessageBoard;
