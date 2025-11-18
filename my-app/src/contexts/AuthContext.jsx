import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', null);
    const [loading, setLoading] = useState(false);

    const login = async (userData) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setUser(userData);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
