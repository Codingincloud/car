import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const savedUser = localStorage.getItem('carboncut_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simple mock validation
                if (email && password) {
                    const userData = {
                        id: 'dh829-s8220',
                        name: email.split('@')[0],
                        email: email,
                        joinDate: new Date().toISOString()
                    };
                    setUser(userData);
                    localStorage.setItem('carboncut_user', JSON.stringify(userData));
                    resolve(userData);
                } else {
                    reject('Invalid credentials');
                }
            }, 1000);
        });
    };

    const signup = (name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const userData = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: name,
                    email: email,
                    joinDate: new Date().toISOString()
                };
                setUser(userData);
                localStorage.setItem('carboncut_user', JSON.stringify(userData));
                resolve(userData);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('carboncut_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
