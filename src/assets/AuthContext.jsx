import React from 'react'
import { createContext,useState } from 'react'

const AuthContext = createContext({
    token: '',
    isLoginedIn: false,
    login: (token) => { },
    logout: () => { }
})

export const AuthContextProvider=({children})=>{
    const initalToken=localStorage.getItem('token') || ''
   
    const [token, settoken] = useState(initalToken)
    const isLoginedIn= true // !!token

    const handlerLogin=(token)=>{
       
        settoken(token)
        localStorage.setItem('token',token)

    }

    const handlerLogout=()=>{
        
           settoken(null)
           localStorage.removeItem('token')
    }

    const ContestValue={
        token:token,
        isLoginedIn:isLoginedIn,
        login:handlerLogin,
        logout:handlerLogout
        
    }
  

    return(
        <AuthContext.Provider value={ContestValue} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
