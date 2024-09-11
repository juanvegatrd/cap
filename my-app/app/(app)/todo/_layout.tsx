import { useTodoStore } from '@/store/todo';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function TodoLayout() {
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, []); 
  
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="details/[id]"
        options={{ headerTitle: 'Task Details' }}
      />
    </Stack>
  );
}
