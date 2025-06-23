// src/Hooks/TokenContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Define the structure of the decoded token
type DecodedToken = {
  id: string;
  userName: string;
  // Add any other fields your JWT contains
};

type TokenContextType = {
  token: string | null;
  decoded: DecodedToken | null;
};

const TokenContext = createContext<TokenContextType>({
  token: null,
  decoded: null,
});

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const storedToken = Cookie.get("userAuthToken");

    if (storedToken) {
      setToken(storedToken);

      try {
        const decodedToken: DecodedToken = jwtDecode(storedToken);
        setDecoded(decodedToken);
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, decoded }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
