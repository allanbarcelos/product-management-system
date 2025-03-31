import { User } from "@interfaces/User";
import { createContext } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    login: (token: string, user: any) => Promise<void>;
    logout: () => void; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;