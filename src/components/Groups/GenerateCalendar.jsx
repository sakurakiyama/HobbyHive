import React, { useState, useEffect } from 'react';
import { Calendar, Badge } from 'antd';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate.js';

/*
[] TODO: Map over all the users groups and populate the menu. 
[] TODO: For each menu, populate the following sub navigations: 
    [] Chat
    [] Calendar
    [] Members

*/

function GenerateCalendar({ groupId }) {
  const [allEvents, setAllEvents] = useState(null);

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

  return <>{allEvents && <Calendar cellRender={cellRender} />}</>;
}

export default GenerateCalendar;
