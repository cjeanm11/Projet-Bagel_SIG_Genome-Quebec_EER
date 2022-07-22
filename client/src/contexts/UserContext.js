import React, {useContext, useState} from 'react'
const UserContext = React.createContext()
const LoginUpdateContext = React.createContext()

export function useUser(){
    return useContext(UserContext)
}

export function useLoginUpdate(){
    return useContext(LoginUpdateContext)
}

export function UserProvider({children}){
    const [userState, setUserState] = useState({loggedIn: false})

    function toggleLoginIn(){
        setUserState((prevState ) =>  ({
            loggedIn: !prevState.loggedIn
        }))
    }

    return(
        <UserContext.Provider value={userState}>
            <LoginUpdateContext.Provider value = {toggleLoginIn}>
                {children}
            </LoginUpdateContext.Provider>
        </UserContext.Provider>
    )
}