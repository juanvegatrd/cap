import { useAuthStore } from '@/store/auth';
import { useTodoStore } from '@/store/todo';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

const LogoutButton = () => {
  const { logout } = useAuthStore();
  const { setLoading, clearTodo } = useTodoStore()
  const router = useRouter(); 
  const onLogout = async() =>{
    try {
      setLoading(true)
      await logout()
      setLoading(false)
      clearTodo()
      router.replace('/')   
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  return (
    <Button title="Logout" onPress={onLogout} />
  );
};

export default LogoutButton;