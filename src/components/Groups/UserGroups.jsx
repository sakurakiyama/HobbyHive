import React, { useState, useEffect } from 'react';
import NavBar from '../NavigationBar/NavBar.jsx';
// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
import {
  Input,
  Layout,
  Menu,
  theme,
  Avatar,
  Calendar,
  Divider,
  Skeleton,
  List,
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Buffer } = require('buffer');

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { TextArea } = Input;

/*
[] TODO: Map over all the users groups and populate the menu. 
[] TODO: For each menu, populate the following sub navigations: 
    [] Chat
    [] Calendar
    [] Members

*/

let navigation = null;

function UserGroups() {
  const [userData, setUserData] = useState({
    user: null,
    interests: null,
    groups: null,
  });
  const [groupData, setGroupData] = useState(null);
  const [userInterests, setUserInterests] = useState({ interests: null });
  const [content, setContent] = useState(null);

  const subHeaders = ['Chat', 'Calendar', 'Members'];

  // Once you have the data, populate the sidebar.
  useEffect(() => {
    const groups = userData.groups;

    navigation =
      groups &&
      groups.map((element, index) => {
        const key = index + 1;
        // Grab the information about this specific group
        const groupId = element.group_id;
        const groupInfo = groupData.find((obj) => obj.id === groupId);
        return {
          key: `sub${key}`,
          //   icon:
          label: groupInfo.groupname,
          children: new Array(groupData.length).fill(null).map((_, j) => {
            const subKey = index * groupData.length + j + 1;
            return {
              key: subKey,
              onClick: () => {
                handleClick(groupId, subHeaders[j]);
              },
              label: subHeaders[j],
            };
          }),
        };
      });
  }, [userData]);

  async function handleClick(groupId, condition) {
    try {
      // If the condition is Members,
      if (condition === 'Members') {
        const { data: members } = await axios.get(
          `/group/getMembers/${groupId}`
        );
        const groupMembers = members.map((user) => {
          const photo = Buffer.from(user.photo).toString('utf-8');
          const dataURI = `data:image/png;base64,${photo}`;
          return (
            <div className='m-1'>
              <Avatar size={75} src={dataURI} />
            </div>
          );
        });
        setContent(groupMembers);
      }
      // Otherwise, if the condition is Calendar,
      else if (condition === 'Calendar') {
        // TODO: Make this calendar personal to the group
        const calendar = <Calendar />;
        setContent(calendar);
      }
      // Otherwise, if the condition is Chat.
      else if (condition === 'Chat') {
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
              maxLength={6}
            />
          </div>
        );
        setContent(chatBox);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { user } = useAuth0();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value) => console.log(value);

  useEffect(() => {
    // If the user is not logged in, redirect them to the landing page
    if (!user) {
      navigate('/');
    }
    // Otherwise get the user data.
    else {
      async function getUserData() {
        try {
          const { data: userInfo } = await axios.post('/user/getAllUserData', {
            email: user.email,
          });
          setUserData({
            user: userInfo.user,
            interests: userInfo.interests,
            groups: userInfo.groups,
          });
          setGroupData(userInfo.groupInfo);

          // Grab all the interest data.
          const { data: userInterests } = await axios.get(
            `/user/getInterests/${userInfo.user.id}`
          );
          setUserInterests({ interests: userInterests });
        } catch (error) {
          console.log(error);
        }
      }
      getUserData();
    }
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Search
              placeholder='search groups'
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                mode='inline'
                style={{ height: '100%', borderRight: 0 }}
                items={navigation}
              />
            </Sider>
            <Layout style={{ padding: '24px 24px 24px' }}>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                }}
              >
                <div className='flex'>{content}</div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </div>
  );
}

export default UserGroups;
