import { View, Text, ImageBackground, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Form from '@/components/Form'
import CustomButton from '@/components/custombutton'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {
  const [form,setform] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting,setIsSubmitting] = useState(false)
  const {setUser,setIsLoggedin} = useGlobalContext()
  
  const submit = async()=>{

    setIsSubmitting(true)
    try {
      // Perform sign-in and get the session
      
      const res = await signIn(form.email, form.password);
      
      // // Retrieve the current user's details
      // const currentUser = await getCurrentUser(); 
      // console.log()
      // if (currentUser && "documents" in currentUser) {
      //   const userDoc = currentUser.documents[0]; // Extract the first document
        
      //   if (userDoc) {
      //     // Map the document to your User type
      //     const mappedUser = {
      //       email: userDoc.email,
      //       name: userDoc.name,
      //       account: userDoc.account,
      //       ...userDoc, // Include additional fields
      //     };
    
      //     // Set global states
      const mappedUser = await getCurrentUser()
          setUser(mappedUser);
          setIsLoggedin(true);
    
          // Navigate to the home page
          router.replace('/home');
      //   } catch(error) {
      //     throw new Error('User document is missing.');
      //   }
      // } else {
      //   throw new Error('No user documents found.');
      // }
    }  catch (error) {
      console.log(error)
      Alert.alert('Credentials do not match')
    }finally{
      setIsSubmitting(false)
    }

  }

  return (
    <ImageBackground source={require('C:/Users/furan/OneDrive/Desktop/code/aiusense1/constants/tempbg.jpeg')} className='h-full w-full'>
    <SafeAreaView >
     <ScrollView>
      <View className='w-full justify-center items-center h-full px-4 my-6'>
       <Text className='font-gentium text-6xl text-white font-semibold mt-7'>Aiusense</Text>
       <Text className='font-gentium text-2xl text-gray-200 font-semibold mt-3'>Signin to Aiusense</Text>
       <Form
       title="Email"
       value={form.email}
       handleChangeText = {(e)=>setform({...form,email:e})}
       otherStyles = 'mt-7'
       keyboardType = "email-address"
       />

       <Form
       title="Password"
       value={form.password}
       handleChangeText = {(e)=>setform({...form,password:e})}
       otherStyles = 'mt-7'
       />

       <View style={{width:'100%',boxShadow:'4px'}}>
        <CustomButton
        title='Sign-In'
        containerStyles='w-full mt-7'
        handlePress={submit}
        isLoading = {isSubmitting}
        />

       </View>

       <View className='justify-center items-center'>
        <Text className='mt-10 font-gentium text-white text-2xl'>
          Don't have an account? <Link href={'/Sign-up'} className='text-pink-600 text-2xl font-gentium hover:text-3xl'>Sign-Up
          </Link>
        </Text>
       </View>
      </View>
     </ScrollView>
     <StatusBar backgroundColor='#ac4ab5' style='light'/>
    </SafeAreaView>
    </ImageBackground>
  )
}

export default SignIn