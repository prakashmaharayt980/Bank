import React from 'react'
import { createContext,useState } from 'react'

const AuthContext = createContext({
    token: '',
    isLoginedIn: false,
    login: (token) => { },
    logout: () => { }
})

export const AuthContextProvider=({children})=>{
    const initalToken=localStorage.getItem('token')
  
    const isLoginedIn= !!initalToken

   

    

    const ContestValue={
     
        isLoginedIn:isLoginedIn,
    
      
        
    }
  

    return(
        <AuthContext.Provider value={ContestValue} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
