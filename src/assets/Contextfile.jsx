
import React, { createContext, useState } from 'react';
import axios from 'axios';


export const MyContext = createContext({
    fetchData:()=>{}
});


const MyContextProvider = ({ children }) => {
   
    const [user, setUser] = useState();
    const fetchData = async () => {
        const url = 'http://192.168.1.77:8000/api/user/'  //manish
     
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json' // Corrected header name
                }
            });
            const data = response.data;
            setUser(data);
        } catch (error) {
            console.error('Error fetching data:', error);
          
        }
    }


    return (
        <MyContext.Provider value={{ user,fetchData }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
