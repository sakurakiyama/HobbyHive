import React, { useState, useEffect } from 'react';
import NavBar from '../NavigationBar/NavBar.jsx';
import { Layout, Menu, theme, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import GenerateCalendar from './GenerateCalendar.jsx';
import MessageBoard from './MessageBoard.jsx';
import GenerateMembers from './GenerateMembers.jsx';

const { Content, Sider } = Layout;

let navigation = null;

function UserGroups() {
  const [userData, setUserData] = useState({
    user: null,
    interests: null,
    groups: null,
  });
  const [groupData, setGroupData] = useState(null);
  const [userInterests, setUserInterests] = useState({ interests: null });
  const [currentGroup, setCurrentGroup] = useState(null);
  const [condition, setCondition] = useState(null);
  const subHeaders = ['Chat', 'Calendar', 'Members'];

  const { user } = useAuth0();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
                setCondition(subHeaders[j]);
                setCurrentGroup(groupId);
              },
              label: subHeaders[j],
            };
          }),
        };
      });
  }, [userData]);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Layout>
            <Sider width={200}>
              <div className='flex flex-col h-full bg-white'>
                <Button className='mt-5 mb-4 mx-3'>Create Group </Button>

                <Menu
                  mode='inline'
                  style={{ height: '100%', borderRight: 0 }}
                  items={navigation}
                />
              </div>
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
                <div className='flex'>
                  {condition === 'Calendar' && currentGroup && (
                    <GenerateCalendar groupId={currentGroup} />
                  )}
                  {condition === 'Members' && currentGroup && (
                    <GenerateMembers groupId={currentGroup} />
                  )}
                  {condition === 'Chat' && currentGroup && (
                    <MessageBoard
                      groupId={currentGroup}
                      userData={userData.user}
                    />
                  )}
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </div>
  );
}

export default UserGroups;
