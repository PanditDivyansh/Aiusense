import { View, Text, ImageBackground, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

const Analytics = () => {
  const [graphUrl, setGraphUrl] = useState<string | null>(null);
  const [insulinUrl, setInsulinUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const glucoseGraphUrl = 'http://192.168.1.25:5000/glucose-graph';
        const insulinGraphUrl = 'http://192.168.1.25:5000/insulin-graph';

        const [graphResponse, insulinResponse] = await Promise.all([
          fetch(glucoseGraphUrl),
          fetch(insulinGraphUrl),
        ]);

        if (!graphResponse.ok) {
          throw new Error('Glucose graph data not available');
        }
        if (!insulinResponse.ok) {
          throw new Error('Insulin graph data not available');
        }

        setGraphUrl(glucoseGraphUrl);
        setInsulinUrl(insulinGraphUrl);
      } catch (err) {
        console.error('Error:', err);
        setError('Unable to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGraph();
  }, []);

  return (
    <ImageBackground
      source={require('C:/Users/furan/OneDrive/Desktop/code/aiusense1/constants/tempbg.jpeg')} // Make sure the path is correct
      className="h-full w-full"
    >
      <View>
        {error && <Text className="text-red-500">{error}</Text>}
      </View>

      {!loading && graphUrl && (
        <View className="w-[400px] m-1 p-1 bg-white opacity-90 rounded-lg shadow-lg shadow-gray-500/30 items-center justify-center">
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

      {!loading && insulinUrl && (
        <View className="w-[400px] m-1 p-1 bg-white opacity-90 rounded-lg shadow-lg shadow-gray-500/30 items-center justify-center">
          <View className="rounded-xl overflow-hidden mb-4">
            <Image
              source={{ uri: insulinUrl }}
              className="w-[380px] h-[210px] object-contain"
            />
          </View>
          <Text className="text-2xl text-lightblue font-gentium">
            Your Insulin update
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default Analytics;
