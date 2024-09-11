import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuthStore } from './auth';

type Todo = {
  id: string;
  name: string;
};

type TodoStore = {
  todos: Todo[];
  loading: boolean; 
  setLoading: (value: boolean) => void; 
  fetchTodos: () => Promise<void>;
  addTodo: (name: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  clearTodo: () => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      loading: false, 

      
      setLoading: (value: boolean) => set({ loading: value }),

      fetchTodos: async () => {
        const { token } = useAuthStore.getState();

        set({ loading: true }); 

        try {
          const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/tasks', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            throw new Error(response.data.error);
          }

          set({
            todos: response.data,
            loading: false, 
          });

        } catch (error) {
          set({ loading: false }); 
          console.error('Error fetching todos:', error.message);
        }
      },

      addTodo: async (name: string) => {
        const { token } = useAuthStore.getState();

        set({ loading: true }); 

        try {
          const response = await axios.post(
            process.env.EXPO_PUBLIC_API_URL + '/api/tasks',
            { name },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.error) {
            throw new Error(response.data.error);
          }

          const newTodo: [Todo] = response.data;

          set((state) => ({
            todos: [...newTodo, ...state.todos],
            loading: false, 
          }));

          console.log('Todo added:', newTodo);
        } catch (error) {
          set({ loading: false });
          console.error('Error adding todo:', error.message);
        }
      },

      removeTodo: async (id: string) => {
        const { token } = useAuthStore.getState();

        set({ loading: true });

        try {
          const response = await axios.delete(process.env.EXPO_PUBLIC_API_URL + `/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            throw new Error(response.data.error);
          }

          set((state) => ({
            todos: state.todos.filter((todo) => Number(todo.id) !== Number(id)),
            loading: false,
          }));

          console.log('Todo removed:', id);
        } catch (error) {
          set({ loading: false }); 
          console.error('Error removing todo:', error.message);
        }
      },
      clearTodo: ()=>{
        set(() => ({
          todos: []
        }));
      }
    }),
    {
      name: 'todo-list',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
