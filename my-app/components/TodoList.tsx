import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useTodoStore } from '../store/todo';
import { styled } from 'nativewind';

const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function TodoList() {
  const { todos } = useTodoStore();
  
  return (
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/todo/details/[id]',
              params: { id: item.id },
            }}
            asChild
          >
            <StyledTouchableOpacity className="flex-row w-full justify-between items-center p-4 mb-4 rounded-xl shadow-lg border">
              <StyledText className="text-lg text-black font-semibold">{item.name}</StyledText>
            </StyledTouchableOpacity>
          </Link>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
      />
  );
}
