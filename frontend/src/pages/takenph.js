import React from 'react';
import './Taken.css';

const Taken = () => {
  const takenItems = [
    { id: 'A101', title: 'Arduino Kit', date: '2025-05-01', status: 'With You', from: 'John Doe' },
    { id: 'A102', title: 'Sensor Pack', date: '2025-04-15', status: 'Returned', from: 'Jane Smith' },
  ];

  return (
    <div className="list-container">
      <h2>Taken Items</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date Taken</th>
            <th>Status</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          {takenItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.status}</td>
              <td>{item.from}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Taken;
