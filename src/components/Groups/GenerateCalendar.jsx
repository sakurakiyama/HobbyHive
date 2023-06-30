import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Button, Form, Input, Space, DatePicker } from 'antd';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate.js';
import { Modal } from '@mui/base';
import { Box } from '@mui/material';

const style = {
  position: 'fixed',
  top: '50%',
  left: 'calc(50% + 100px)',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  zIndex: 1200,
};

const SubmitButton = ({ form, groupId }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button
      style={
        !submittable
          ? { backgroundColor: 'gray' }
          : { backgroundColor: 'green' }
      }
      type='primary'
      htmlType='submit'
      disabled={!submittable}
      onClick={() => {
        // TODO: Send request to the backend to add an event for that group.
        console.log(groupId);
      }}
    >
      Submit
    </Button>
  );
};

function GenerateCalendar({ groupId }) {
  const [allEvents, setAllEvents] = useState(null);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const handleClose = () => {
    setOpen(false);
  };

  function handleOpen() {
    setOpen(true);
  }

  useEffect(() => {
    async function generateEvents() {
      const { data: events } = await axios.get(`/group/getEvents/${groupId}`);
      setAllEvents(events);
    }
    generateEvents();
  }, [groupId]);

  const dateCellRender = (value) => {
    const current = new Date(value.$d);
    const currentDateFormatted = formatDate(current);

    return (
      <ul className='events'>
        {allEvents.map((item, index) => {
          const eventDate = new Date(item.date);
          const eventDateFormatted = formatDate(eventDate);
          if (currentDateFormatted === eventDateFormatted) {
            return (
              <li key={index}>
                <Badge color={'pink'} text={item.eventname} />
              </li>
            );
          }
        })}
      </ul>
    );
  };

  const monthCellRender = (value) => {
    const current = new Date(value);
    const currentMonth = current.getMonth();

    return (
      <ul className='events'>
        {allEvents.map((item, index) => {
          const eventDate = new Date(item.date);
          const eventMonth = eventDate.getMonth();
          if (currentMonth === eventMonth) {
            return (
              <li key={index}>
                <Badge color={'pink'} text={item.eventname} />
              </li>
            );
          }
        })}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={open ? 'w-screen h-screen top-0 fixed z-[1200]' : ''}
      ></div>
      {allEvents && (
        <div className='text-center'>
          <Calendar cellRender={cellRender} />
          <Button
            style={{ background: 'white', borderColor: 'grey' }}
            onClick={() => handleOpen()}
          >
            Add Event
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div className='mt-1 space-y-4'>
                <p className='text-center'>Add an event</p>
                <Form
                  form={form}
                  name='validateOnly'
                  layout='vertical'
                  autoComplete='off'
                >
                  <Form.Item
                    name='eventName'
                    label='Event Name'
                    rules={[{ required: true }]}
                  >
                    <Input style={{ borderRadius: '6px' }} />
                  </Form.Item>
                  <Form.Item
                    name='date-time-picker'
                    label='Date and Time'
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      getPopupContainer={(triggerNode) => {
                        return triggerNode.parentNode;
                      }}
                      showTime
                      format='YYYY-MM-DD HH:mm:ss'
                    />
                  </Form.Item>
                  <Form.Item
                    name='description'
                    label='Description'
                    rules={[{ required: true }]}
                  >
                    <Input style={{ borderRadius: '6px' }} />
                  </Form.Item>
                  <Form.Item
                    name='location'
                    label='Location'
                    rules={[{ required: true }]}
                  >
                    <Input style={{ borderRadius: '6px' }} />
                  </Form.Item>
                  <Form.Item>
                    <div className='text-center'>
                      <Space>
                        <SubmitButton form={form} groupId={groupId} />
                        <Button htmlType='reset'>Reset</Button>
                      </Space>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}

export default GenerateCalendar;
