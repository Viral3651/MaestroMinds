import React , { createContext , useState}from 'react'
export const UserContext =createContext();
export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        id: 1,
        username: 'Sapnish Sharma',
        isTutor: false,
        isStudent: false
    });

    return (
        <UserContext.Provider value={{user , setUser}}>
            {children}
        </UserContext.Provider>
    );
}
