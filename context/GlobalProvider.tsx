import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser } from '../lib/appwrite';

// Define the User type (customize based on your requirements)
interface User {
  $id: string;
  email: string;
  name: string;
  account: string;
  [key: string]: any; // Allow additional properties for flexibility
}

// Define the context type
interface GlobalContextType {
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

// Create the context with a default value of `undefined`
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Custom hook to use the GlobalContext
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

// GlobalProvider component
const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser(); // Fetch the user directly
        if (currentUser) {
          setUser(currentUser); // Directly set the user without mapping
          setIsLoggedin(true);
        } else {
          setIsLoggedin(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsLoggedin(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
