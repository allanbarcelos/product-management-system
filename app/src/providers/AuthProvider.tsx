import axios from "axios";
import AuthContext from "@contexts/AuthContext";
import { User } from "@interfaces/User";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');        
        if (token) {
            try {
                const decoded = jwtDecode<User>(token);
                setUser(decoded);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Decoding fail:", error);
                localStorage.removeItem('token'); 
            }
        }
        setIsLoading(false); 
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};