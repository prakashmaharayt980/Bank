
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { urlUser, urlFundHistory,urlBank } from './RequiredUrlOfBackend'
import AuthContext from './AuthContext';



export const MyContext = createContext({
    fetchData: () => { },
    HistoryData: () => { }
});


const MyContextProvider = ({ children }) => {
    const { isLoginedIn } = useContext(AuthContext)
   
    const headers = {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }

    const [transactions, setTransactions] = useState([]);
    const [BankData, setBankData] = useState([])

    const [user, setUser] = useState();
    const fetchData = async () => {


        try {
            const response = await axios.get(urlUser, { headers });
            const data = response.data;
            setUser(data);
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    }
    const HistoryData = async () => {
        try {
            const response = await axios.get(urlFundHistory, { headers });

            setTransactions(response.data)

        } catch (error) {
            console.error('Error fetching transactions:', error);
        }

    }
    const BankDataFromUrl = async () => {
        try {
            const response = await axios.get(urlBank, { headers });

            setBankData(response.data)

        } catch (error) {
            console.error('Error fetching transactions:', error);
        }

    }
    useEffect(() => {
        if (isLoginedIn) {
            fetchData()
            HistoryData()
            BankDataFromUrl()

        }
    }, [])


    return (
        <MyContext.Provider value={{ user,transactions,fetchData,BankData}}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
