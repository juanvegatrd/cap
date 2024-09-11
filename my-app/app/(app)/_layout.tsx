import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function Layout() {
 
  return (
    <Tabs>
      <Tabs.Screen
        name="todo"
        options={{
          headerShown: false,
          tabBarLabel: "To-Do List",
          tabBarIcon: ({ color, size }) => <Text>T</Text>,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => <Text>P</Text>,
        }}
      />
    </Tabs>
  );
}
