import React, { createContext, useEffect, useState } from "react";
// import * as Auth from '../services/auth'

interface AuthContext {
  signed: boolean,
  user: object | null,
  signIn(): Promise<void>
  exitToApp(): void
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [signed, setSigned]: any = useState(null);
  const [user, setUser] = useState<object | null>(null)

  useEffect(() => {
    const userStorage = localStorage.getItem("@app::user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
      setSigned(true);
    }
  }, [setSigned]);

  function exitToApp() {
    localStorage.removeItem("@app::user");
    setSigned(false);
  }

  async function signIn() {
    localStorage.removeItem("@app::user");
    setSigned(false);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, exitToApp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
