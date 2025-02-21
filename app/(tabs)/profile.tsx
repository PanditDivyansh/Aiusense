import { View, Text,ImageBackground } from 'react-native'
import React from 'react'
import CustomButton from '@/components/custombutton'
import { logOut } from '@/lib/appwrite'
import { router } from 'expo-router'

const logouthelp =()=>{
  try {
    logOut().then(()=>{router.replace('/Sign-in')})
  } catch (error) {
    throw new Error()
  }
}

const profile = () => {
  return (
    <ImageBackground
                  source={require('C:/Users/furan/OneDrive/Desktop/code/aiusense1/constants/tempbg.jpeg')}
                  className="h-full w-full"
                >
    <View >
      <CustomButton 
      title='Log out'
      handlePress={()=>logouthelp()}
      containerStyles='mt-7 w-full'
      ></CustomButton>
    </View>
    </ImageBackground>
  )
}

export default profile