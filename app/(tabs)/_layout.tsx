import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import color from '@/lib/colors';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color.textSecondary,
        headerStyle: {
          backgroundColor: color.background,
          height: 30,
        },
        headerShadowVisible: false,
        headerTintColor: 'transparent',
        tabBarStyle: {
          backgroundColor: color.accent,
          padding: 10,
          height: 'auto',
        //   borderTopLeftRadius: 80,
        //   borderTopRightRadius: 80,

        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
