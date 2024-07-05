import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { urlUser, urlFundHistory, urlBank, urlReceived } from './RequiredUrlOfBackend';
import AuthContext from './AuthContext';

export const MyContext = createContext({
  user: null,
  transactions: [],
  bankData: [],
  fetchData: () => {}
});

const MyContextProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [transactionRecieved, setTransactionsRecived] = useState([]);
  const [bankData, setBankData] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));

  const headers = {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json'
  };

  const fetchData = async () => {
    if (!token) return;

    try {
      const [userResponse, transactionsResponse, bankDataResponse,transactionsRecivedResponse] = await Promise.all([
        axios.get(urlUser, { headers }),
        axios.get(urlFundHistory, { headers }),
        axios.get(urlBank, { headers }),
        axios.get(urlReceived, { headers }),
      ]);

      setUser(userResponse.data);
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      setTransactionsRecived(transactionsRecivedResponse.data)
      setTransactions(transactionsResponse.data);
      setBankData(bankDataResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <MyContext.Provider value={{ user, transactions, bankData, fetchData,transactionRecieved }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
