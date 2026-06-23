import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthState {
  token: string | null;
  role: string | null;
}

interface AuthContextValue extends AuthState {
  signIn: (token: string, role: string) => void;
  signOut: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => ({
    token: sessionStorage.getItem('token'),
    role: sessionStorage.getItem('role'),
  }));

  function signIn(token: string, role: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    setAuth({ token, role });
  }

  function signOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    setAuth({ token: null, role: null });
  }

  return (
    <AuthContext.Provider
      value={{ ...auth, signIn, signOut, isAdmin: auth.role === 'ADMIN' }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
