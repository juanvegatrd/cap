import Spinner from "@/components/Spinner";
import { useTodoStore } from "@/store/todo";
import { Stack } from "expo-router";

export default function Layout() {
  const { loading } = useTodoStore();
  return (
    <>
    {loading && <Spinner/>}
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
    </>
  );
}
