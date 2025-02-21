import { View, Text, ImageBackground, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Form from '@/components/Form'
import CustomButton from '@/components/custombutton'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { createUser } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'


const SignUp = () => {
  const [form,setform] = useState({
    RefCode: '',
    email: '',
    password: ''
  })

  const [isSubmitting,setIsSubmitting] = useState(false)
  const {setUser,setIsLoggedin} = useGlobalContext()

  const submit = async()=>{
   if(!form.RefCode|| !form.email || !form.password){
    Alert.alert('please fill all the required fields')
    return
   }

   setIsSubmitting(true)
   try {
    const res = await createUser(form.RefCode,form.email,form.password)
    console.log(res)
    // setUser(res)
    // setIsLoggedin(true)
    router.replace('/home')
   } catch (error) {
    console.log(form.email,error)
    Alert.alert('Signup failed')
    throw new Error()
   }finally {
    setIsSubmitting(false); // Ensure this is called to reset the loading state
}

  }

  return (
    <ImageBackground source={require('C:/Users/furan/OneDrive/Desktop/code/aiusense1/constants/tempbg.jpeg')} className='h-full w-full'>
    <SafeAreaView >
     <ScrollView>
      <View className='w-full justify-center items-center h-full px-4 my-6'>
       <Text className='font-gentium text-6xl text-white font-semibold mt-7'>Aiusense</Text>
       <Text className='font-gentium text-2xl text-gray-200 font-semibold mt-3'>SignUp to Aiusense</Text>

       <Form
       title="Reference code"
       value={form.RefCode}
       handleChangeText = {(e)=>setform({...form,RefCode:e})}
       otherStyles = 'mt-10'
       />

       <Form
       title="Email"
       value={form.email}
       handleChangeText = {(e)=>setform({...form,email:e})}
       otherStyles = 'mt-7'
       keyboardType = "email-address"
       />

       <Form
       title="Password(Min 8 characters)"
       value={form.password}
       handleChangeText = {(e)=>setform({...form,password:e})}
       otherStyles = 'mt-7'
       />

       <View style={{width:'100%',boxShadow:'4px'}}>
        <CustomButton
        title='Sign-Up'
        containerStyles='w-full mt-7'
        handlePress={submit}
        isLoading = {isSubmitting}
        />

       </View>

       <View className='justify-center items-center'>
               <Text className='mt-10 font-gentium text-white text-2xl'>
                 Already have an account? <Link href={'/Sign-in'} className='text-pink-600 text-2xl font-gentium hover:text-3xl'>Sign-In
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

export default SignUp