// MainComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoryTable from './HistoryTable';

const Historyfile = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };
    // Fetch transaction data from the server
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://192.168.1.77:8000/api/transaction-history',{headers});

        setTransactions(response.data);
        console.log(transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []); // Run this effect only once on component mount

  return (
    <div>
      <HistoryTable transactions={transactions} />
    </div>
  );
};

export default Historyfile;
