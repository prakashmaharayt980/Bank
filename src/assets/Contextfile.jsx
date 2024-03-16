import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import AuthContext from './AuthContext';

export const MyContext = createContext({});


const MyContextProvider = ({ children }) => {
//    const Authtoken= useContext(AuthContext)
   
//    const tokens =Authtoken.token
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const url='http://192.168.1.77:8000/api/user/'  //manish
            // const url ='https://dummyjson.com/auth/me' //testing
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json' // Corrected header name
                    }
                });

               
                    const data =  response.data;
                    
                   
                    setUser(data);
                    
                
              
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error
            }
        };

       
            fetchData();
        
    }, []); // Fetch data whenever token changes

    return (
        <MyContext.Provider value={{ user }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
