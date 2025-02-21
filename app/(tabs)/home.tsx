import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  const [graphUrl, setGraphUrl] = useState<string | null>(null);
  const [personalMessage, setPersonalMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const graphUrl = "http://192.168.1.25:5000/glucose-graph";
        const msgUrl = "http://192.168.1.25:5000/PersMsg";

        // Fetch both URLs in parallel
        const [graphResponse, msgResponse] = await Promise.all([
          fetch(graphUrl),
          fetch(msgUrl),
        ]);

        // Check for errors in responses
        if (!graphResponse.ok) {
          throw new Error("Graph data not available");
        }

        if (!msgResponse.ok) {
          throw new Error("Failed to fetch personal message");
        }

        // Read responses
        const personalMessageData = await msgResponse.text(); // Assuming it's plain text

        // Update state
        setGraphUrl(graphResponse.url); // Use response URL
        setPersonalMessage(personalMessageData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGraph();
  }, []);

  return (
    <ImageBackground
      source={require('C:/Users/furan/OneDrive/Desktop/code/aiusense1/constants/tempbg.jpeg')}
      className="h-full w-full"
    >
      <SafeAreaView className="justify-center items-center">
        <FlatList
          data={[]}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text className="text-6xl px-4 text-white">{item}</Text>
          )}
          ListHeaderComponent={() => (
            <View className="mt-8 p-4 space-y-6 bg-white w-[400px] opacity-80 rounded-lg shadow-lg">
              <View className="justify-center items-center flex-row mb-0">
                <View>
                  <Text className="font-gentium text-xl px-1 text-gray-700">
                    Welcome back
                  </Text>
                  <Text className="font-gentium text-5xl text-lightblue">
                    UserName {/* Replace with dynamic user data */}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
{loading ? (
  <ActivityIndicator size="large" color="#ac4ab5" />
) : error ? (
  <Text className="text-red-500 text-lg mt-4">{error}</Text>
) : (
  <>
    {/* Graph Block */}
    {graphUrl && (
      <View className="w-[400px] m-4 p-6 bg-white opacity-90 rounded-lg shadow-lg shadow-gray-500/30 items-center justify-center">
        {/* Image Container with Rounded Corners */}
        <View className="rounded-xl overflow-hidden mb-4">
          <Image
            source={{ uri: graphUrl }}
            className="w-[380px] h-[210px] object-contain"
          />
        </View>
        <Text className="text-2xl text-lightblue font-gentium">
          Your glucose update
        </Text>
      </View>
    )}

    {/* Personal Message Block */}
    {personalMessage && (
      <View className="w-[400px] my-3 mx-4 p-6 bg-white opacity-90 rounded-lg shadow-lg shadow-gray-500/30 items-center justify-center">
        <Text className="text-lg text-gray-700 font-gentium text-center">
          {personalMessage}
        </Text>
      </View>
    )}
  </>
)}

        
        


        <StatusBar backgroundColor="#ac4ab5" style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
