import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

interface FormProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  [key: string]: any;
}

const Form: React.FC<FormProps> = ({
  title = "",
  value = "",
  placeholder = "",
  handleChangeText,
  otherStyles = "",
  ...Props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`w-full space-y-2 ${otherStyles}`}>
      {/* Title */}
      <Text className="font-gentium text-white font-semibold text-lg">{title}</Text>

      {/* Input Field */}
      <View className="border-2 border-white w-full h-16 px-4 bg-blue-200 rounded-lg drop-shadow-xl flex-row items-center">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={value}
          onChangeText={handleChangeText}
          className="text-white flex-1 h-full"
          {...Props}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            className="ml-3"
          >
            <Text className="text-white">{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Form;
