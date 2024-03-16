// TransactionHistory.js

import React from 'react';
import './TransactionHistory.css'; // Import CSS file for styling

const HistoryTable = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Receiver Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.receiverName}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.date}</td>
              <td>{transaction.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
