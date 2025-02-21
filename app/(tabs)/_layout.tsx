import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import icon set
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

const Tablayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: '#ac5ab5', 
          // borderTopWidth: 1,
          borderTopColor: '#ac5ab5',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffffff',
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={32} color="#ffffff" />
          ),
        }}
      />

      {/* Analytics Tab */}
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={32} color="#ffffff" /> 
          ),
        }}
      />

      {/* BuddyPlus Tab */}
      <Tabs.Screen
        name="buddyplus"
        options={{
          title: 'Buddy+',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={32} color="#ffffff" /> 
          ),
        }}
/>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={32} color="#ffffff" /> 
          ),
        }}
      />
    </Tabs>
  );
};

export default Tablayout;
