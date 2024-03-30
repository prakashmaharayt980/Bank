import React, { useContext } from 'react';
import './TransactionHistory.css'; // Import CSS file for styling
import { MyContext } from '../../assets/Contextfile';

const HistoryTable = () => {
  const { transactions } = useContext(MyContext);

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
            <tr key={index}>
              <td>{ transaction.receiver_name }</td>
              <td>{ transaction.receiver_account_number }</td>
              <td>Rs {transaction.amount}</td>
              <td>{transaction.timestamp}</td>
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
