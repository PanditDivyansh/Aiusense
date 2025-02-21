import { View, Text, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

const Buddyplus = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  // Function to handle sending messages
  const onSend = (newMessages: IMessage[] = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <View>
    <ImageBackground
      source={require('C:/Users/furan/OneDrive/Desktop/code/aiusense1/constants/tempbg.jpeg')} // Use a relative path
      className="h-full w-full"
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Chat Component */}
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1, // Current user ID
            name: "User",
          }}
          placeholder="Type a message..."
        />
      </KeyboardAvoidingView>
    </ImageBackground>
    </View>
  );
};

export default Buddyplus;
