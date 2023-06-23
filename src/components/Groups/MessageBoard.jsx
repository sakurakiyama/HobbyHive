import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import { Divider, Skeleton, List, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  // Need to pull the chat from the group based on the groupid.
  // render unique chat boxes.

  async function sendMessage(groupId) {
    try {
      const information = {
        userid: userData.id,
        groupid: groupId,
        message: message,
      };
      const { data } = await axios.patch('/group/postMessage', information);
      console.log(data);
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
        <InfiniteScroll
          dataLength={50}
          // next={loadMoreData}
          hasMore={20 < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget='scrollableDiv'
        >
          <List
            dataSource={'greeting'}
            renderItem={(item) => (
              <List.Item key={'not special'}>
                <List.Item.Meta
                  // avatar={<Avatar src={item.picture.large} />}
                  title='hello'
                  description={'goodbye'}
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
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
