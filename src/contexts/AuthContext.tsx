
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginCredentials, RegisterData } from "../types";
import { mockUsers } from "../services/mockData";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, we would validate credentials against a backend
    const foundUser = mockUsers.find(u => u.email === credentials.email);
    
    if (foundUser) {
      // Simulate password validation (in a real app, use proper password comparison)
      // For demo, any password works
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === data.email)) {
      toast({
        title: "Registration failed",
        description: "Email already exists",
        variant: "destructive",
      });
      return false;
    }
    
    // Create new user (in a real app, this would be handled by the backend)
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: "voter", // Default role
    };
    
    // Add to mock users (simulating database insert)
    mockUsers.push(newUser);
    
    // Log in the new user
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: "Your account has been created",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
