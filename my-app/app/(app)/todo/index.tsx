import TodoList from "@/components/TodoList";
import { Text, TextInput, Button, View, SafeAreaView, Keyboard } from "react-native";
import { useState } from "react";
import { styled } from "nativewind";
import { useTodoStore } from "@/store/todo";

const StyledTextInput = styled(TextInput);
const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);

export default function Home() {
  const { addTodo, setLoading, loading } = useTodoStore();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async() => {
    if (newTodo.trim()) {
      try {
        setLoading(true)
        Keyboard.dismiss();
        await addTodo(newTodo);
        setNewTodo("");
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
  };
  return (
    <StyledSafeAreaView className="flex-1 justify-start items-center pt-5 bg-gradient-to-b from-blue-300 to-blue-600">
      <StyledText className="text-3xl font-bold text-black my-4">
        Welcome!
      </StyledText>
      <StyledView className="mb-1 pt-4 px-4 flex-row items-center">
        <StyledTextInput
          placeholder="Add a new task"
          value={newTodo}
          disableFullscreenUI={loading}
          onChangeText={setNewTodo}
          className="flex-1 border border-gray-300 rounded-lg p-1 px-2 m-2 shadow-sm"
        />
        <Button title="Add" onPress={handleAddTodo} color="#4CAF50" disabled={loading} />
      </StyledView>

      <StyledView className="w-full flex-1 rounded-xl shadow-lg">
        <TodoList />
      </StyledView>
    </StyledSafeAreaView>
  );
}
