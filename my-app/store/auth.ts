import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'; 
import { useTodoStore } from "./todo";

export interface Profile {
  id: string;
  email: string;
  createdAt: string;
}

type State = {
  token: string | null;
  isAuth: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: null,
      isAuth: false,
      
      setToken: (token: string) =>
        set({
          token,
          isAuth: !!token,
        }),

      register: async (email: string, password: string) => {
        try {
          const response = await axios.post(process.env.EXPO_PUBLIC_API_URL+'/api/auth/register', {
            email,
            password,
          });

          if (response.data.error) {
            throw new Error(response.data.error);
          }

          console.log("User registered successfully");

        } catch (error) {
          console.error("Error registering user:", error.message);
          throw error; 
        }
      },

      login: async (email: string, password: string) => {
        try {
          const response = await axios.post(process.env.EXPO_PUBLIC_API_URL+'/api/auth/login',{
            email,
            password,
          });
          
          if (response.data.error) {
            throw new Error(response.data.error); 
          }

          const { token } = response.data;

          set({
            token: token,
            isAuth: true,
          });
        } catch (error) {
          console.error("Error logging in:", error.message);
          throw error; 
        }
      },
      logout: async () => {
        try {
          const response = await axios.post(process.env.EXPO_PUBLIC_API_URL+'/api/auth/logout');
          
          if (response.data.error) {
            throw new Error(response.data.error);
          }
       
          set({
            token: null,
            isAuth: false
          });
        } catch (error) {
          console.error("Error logging out:", error.message);
          throw error; 
        }
      },
    }),
    {
      name: "auth",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
