import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// SIMULATED AUTHENTICATION (No Backend)
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

    // Register function (Simulated)
    const register = async (name, email, password) => {
        // Mimic network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (!name || !email || !password) {
            return { success: false, error: 'All fields are required' };
        }

        const newUser = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            name,
            email,
            joinDate: new Date().toISOString()
        };

        setUser(newUser);
        localStorage.setItem('carboncut_user', JSON.stringify(newUser));
        return { success: true };
    };

    // Login function (Simulated)
    const login = async (email, password) => {
        // Mimic network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (email && password) {
            const existingUser = localStorage.getItem('carboncut_user');
            let userData;

            // If a user was previously created, try to match? 
            // For simplicity in this demo, we'll just allow any login with data or create a mock session
            // assuming if they have an account they would use it.
            // But actually, let's just create a session based on the email provided.

            if (existingUser) {
                const parsed = JSON.parse(existingUser);
                if (parsed.email === email) {
                    userData = parsed;
                } else {
                    // Creating new session for new email for demo purposes
                    userData = {
                        id: 'user_' + Math.random().toString(36).substr(2, 9),
                        name: email.split('@')[0],
                        email: email,
                        joinDate: new Date().toISOString()
                    };
                }
            } else {
                userData = {
                    id: 'user_' + Math.random().toString(36).substr(2, 9),
                    name: email.split('@')[0],
                    email: email,
                    joinDate: new Date().toISOString()
                };
            }

            setUser(userData);
            localStorage.setItem('carboncut_user', JSON.stringify(userData));
            return { success: true };
        }

        return { success: false, error: 'Invalid credentials' };
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('carboncut_user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
