import React, { createContext, useContext, useEffect, useState } from "react";
import { Api } from "../../services/api";

interface User {
  id?: number
  hierarchy?: number
  name?: string
  password?: string
  image?: string
  extras?: number
  active?: number
  created_at?: string
}

interface AuthContextProps {
  signed: boolean
  user: User | null
  signIn: (name: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<object | null>(null)

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = localStorage.getItem("@app::user")

      if (storagedUser) {
        setUser(JSON.parse(storagedUser))
      }
    }

    loadStoragedData()
  }, []);

  async function signIn(name: string, password: string) {
    const response = await Api.post("\auth", { name: name, password: password })

    if (response.data?.auth) {
      setUser({ ...response.data });
    }

    // localStorage.setItem("@app::user", JSON.stringify(response));
  }

  function signOut() {
    localStorage.removeItem("@app::user");
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthContext, useAuth };

