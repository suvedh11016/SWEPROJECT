import React from 'react';
import './Given.css';

const Given = () => {
  const givenItems = [
    { id: 'G201', title: 'Soldering Kit', date: '2025-04-10', status: 'With User', to: 'Alice Brown' },
    { id: 'G202', title: 'Multimeter', date: '2025-03-25', status: 'Returned', to: 'Bob Johnson' },
  ];

  return (
    <div className="list-container">
        
      <h2>Given Items</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date Given</th>
            <th>Status</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {givenItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.status}</td>
              <td>{item.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Given;
