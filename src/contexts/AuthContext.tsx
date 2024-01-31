import { useState, useEffect, createContext, ReactNode } from "react";
import { api } from "../services/api";
import { Cache, Cryptography } from "../adapters";
import { useRouter } from "next/navigation";
import { userService } from "@/services";

interface SignInProps {
  email: string;
  senha: string;
}

interface AuthContextData {
  user: string | null;
  isAuthenticated: boolean;
  signIn: ({ email, senha }: SignInProps) => {};
  logout: () => void;
  verifyToken: () => void;
  saveAccessToken: (accessToken: string) => void;
  setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUpOpen: boolean;
  accessToken: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const { push: navigate } = useRouter();
  const [user, setUser] = useState(null);

  const isAuthenticated = Cache.get({ key: "accessToken" });

  async function logout() {
    setUser(null);
    Cache.remove({ key: "accessToken" });
    navigate("/login");
  }

  async function verifyToken() {
    if (!isAuthenticated) {
      logout();
    }
  }
  interface SignInProps {
    email: string;
    senha: string;
  }

  async function signIn({ email, senha }: SignInProps) {
    const response = await userService.login(email, senha);
    if (response.status === 200) {
      const { accessToken } = response.data;
      saveAccessToken(accessToken);
      navigate("/");
    }
  }
  const getAccessToken = () => {
    const accessToken = Cache.get({
      key: "accessToken",
    });
    return accessToken;
  };

  const [accessToken, setAccessToken] = useState<string>(getAccessToken());
  const saveAccessToken = (accessToken: string) => {
    Cache.set({
      key: "accessToken",
      value: accessToken,
    });
    setAccessToken(accessToken);
    setUser(Cryptography.decodeToken(accessToken));
  };

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        logout,
        user,
        verifyToken,
        saveAccessToken,
        isSignUpOpen,
        setIsSignUpOpen,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
