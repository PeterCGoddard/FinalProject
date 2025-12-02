import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children })
{
    const [user, setUser] = useState(() =>
    {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const [token, setToken] = useState(() =>
    {
        return localStorage.getItem("token") || "";
    });

    useEffect(() =>
    {
        if (user) 
        {
            localStorage.setItem("user", JSON.stringify(user));
        }
        else
        {
            localStorage.removeItem("user");
        }

        if (token)
        {
            localStorage.setItem("token", token);
        }
        else
        {
            localStorage.removeItem("token");
        }
    }, [user, token]);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
        {children}
        </AuthContext.Provider>
    );
}
