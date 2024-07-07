import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const getUser = localStorage.getItem('user');
    const [authUser, setAuthUser] = useState(
        getUser ? JSON.parse(getUser) : undefined
    );

    return (
        <AuthContext.Provider value={[ authUser, setAuthUser ]}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
