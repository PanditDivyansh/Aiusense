import { TouchableOpacity,Text } from 'react-native'
import React from 'react'

const CustomButton = ({title="",handlePress=()=>{},containerStyles='',textStyles='',isLoading=false}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-gred rounded-xl shadow-metalgrey drop-shadow-xl min-h-[62px] justify-center items-center relative ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
    disabled = {isLoading}
    >
      <Text className={`text-lg font-gentium font-bold text-white ${textStyles}`}>{title}</Text>

      
    </TouchableOpacity>
  )
}

export default CustomButton