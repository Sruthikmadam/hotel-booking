
import React from 'react';
import { Tabs } from 'antd';
const items = [
    {
      key: '1',
      label: 'Bookings',
      children: 'Booking',
    },
    {
      key: '2',
      label: 'Rooms',
      children: 'room',
    },
    {
      key: '3',
      label: 'Add Rooms',
      children: 'add room',
    },
    {
        key: '4',
        label: 'Users',
        children: 'users',
      }

  ];
  
  

function AdminScreen() {
  return (
  <div className='mt-3 ml-3 mr-3'>
    <div className='adminscreen'>
    <h1>Admin Panel</h1>
  <Tabs defaultActiveKey="1" items={items} /></div></div>
  );
    
  

}
export default AdminScreen