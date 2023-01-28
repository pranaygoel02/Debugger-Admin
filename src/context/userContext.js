import React,{useContext,useState,useEffect} from 'react'

const UserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}


export const UserProvider = ({children}) => {
    const [user,setUser] = useState(localStorage.getItem('DebuggerAdmin') || null)

    useEffect(()=>{
        if(user === null){
            localStorage.removeItem('DebuggerAdmin')
        }
        if(user !== null) {
            localStorage.setItem('DebuggerAdmin',user)
            setUser(localStorage.getItem('DebuggerAdmin'))
        }
        
    },[user])

    const value = {
        user,setUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}
