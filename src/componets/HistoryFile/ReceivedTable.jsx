import React, { useContext } from 'react';
import './TransactionHistory.css'; // Import CSS file for styling
import { MyContext } from '../../assets/Contextfile';

const ReceivedTable = () => {
  const { transactionRecieved } = useContext(MyContext);
  const userdata = JSON.parse(localStorage.getItem('user'));

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  console.log('user', userdata?.user?.name);

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Sender Name</th>
            <th>Sender Account</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {transactionRecieved.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.sender}</td>
              <td>{transaction.sender_account_number}</td>
              <td>Rs {transaction.amount}</td>
              <td>{formatTime(transaction.timestamp)}</td>
              <td>{transaction.remarks || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivedTable;
