import { View, Text, Button, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTodoStore } from '@/store/todo';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function TodoDetails() {
  const { id } = useLocalSearchParams();
  
  const { todos, removeTodo, setLoading } = useTodoStore();
  const router = useRouter();

  const todo = todos.find((item) => Number(item.id) === Number(id));

  const handleRemoveTodo = async() => {
    try {
      setLoading(true)
      await removeTodo(id as string);
      setLoading(false)
      Alert.alert("Todo removed");
      router.back()
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  if (!todo) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText className="text-xl">Todo not found!</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 p-4">
      <StyledImage
        source={{ uri: `https://via.placeholder.com/150` }}
        className="w-full h-64 mb-4 rounded-lg shadow-xl"
      />
      <StyledText className="text-2xl font-bold mb-4">Task: {todo.name}</StyledText>
      <Button title="Remove Todo" onPress={handleRemoveTodo} color="red" />
    </StyledView>
  );
}
