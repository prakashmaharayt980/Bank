import React from 'react'
import { createContext,useState } from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoginedIn: false,
    login: (token) => { },
    logout: () => { }
})

export const AuthContextProvider=({children})=>{
    const initalToken=localStorage.getItem('token') || ''
    console.log(initalToken)
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
    console.log('token',token)

    return(
        <AuthContext.Provider value={ContestValue} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
