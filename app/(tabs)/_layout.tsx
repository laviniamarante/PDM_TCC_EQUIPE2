import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: '#006C5B',
    tabBarInactiveTintColor: '#575656',
    tabBarStyle: {
      backgroundColor: '#d7e4e2',
      height: 80,
      paddingTop: 10,
    },

    
    }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home",
          tabBarIcon: () => (
            <FontAwesome name="home" size={25} color={'#006C5B'} />
          ),
         }}
      />

      <Tabs.Screen
         name="lembretes"
         options={{
         title: "Lembretes",
         tabBarIcon: () => (
      <Ionicons name="notifications" size={25} color={'#006C5B'} />
    ),
  }}
/>

    </Tabs>
  );
}