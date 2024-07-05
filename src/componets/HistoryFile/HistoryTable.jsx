import React, { useContext } from 'react';
import './TransactionHistory.css'; // Import CSS file for styling
import { MyContext } from '../../assets/Contextfile';
import { json } from 'react-router-dom';

const HistoryTable = () => {
  const { transactions } = useContext(MyContext);
 const userdata=JSON.parse(localStorage.getItem('user'))
 const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
 console.log('user',userdata?.user?.name)
  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Receiver  Name</th>
            <th>Receiver  Account</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Remarks</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} >
              <td>{ transaction.receiver }</td>
              <td>{ transaction.receiver_account_number }</td>
              <td>Rs {transaction.amount}</td>
              <td>{formatTime(transaction.timestamp)}</td>
              <td>{transaction.remarks || '-'}</td>
              {/* <td>{transaction.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
