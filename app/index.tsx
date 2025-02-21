import React, { useEffect, useRef, useState } from "react";
import { Text, View, Animated, SafeAreaView, ScrollView, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import CustomButton from "@/components/custombutton";
import { Redirect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";
import { settingLog } from "@/lib/appwrite"; // Assuming this checks the session

export default function Index() {
  const topImagePosition = useRef(new Animated.Value(0)).current; // Controls the top image's position
  const bottomImagePosition = useRef(new Animated.Value(200)).current; // Controls the bottom image's position
  const bottomImageOpacity = useRef(new Animated.Value(0)).current; // Controls the bottom image's opacity
  const router = useRouter();
  const { isLoading, isLoggedin, setIsLoggedin } = useGlobalContext();
  const [checkingSession, setCheckingSession] = useState(true); // Track session check status

  useEffect(() => {
    // Check login session on mount
    const checkSession = async () => {
      const loggedIn = await settingLog();
      setIsLoggedin(loggedIn);
      setCheckingSession(false); // Session check complete
    };
    checkSession();

    // Start the animations
    Animated.parallel([
      Animated.timing(topImagePosition, {
        toValue: 100, // Move the top image down
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(bottomImagePosition, {
        toValue: 100, // Move the bottom image up
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(bottomImageOpacity, {
        toValue: 1, // Fade in the bottom image
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Redirect if logged in
  if (isLoggedin) {
    return <Redirect href={"/home"} />;
  }

  // Show loader while checking session
  if (checkingSession) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <ActivityIndicator size="large" color="#ac4ab5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ImageBackground className="w-full h-full" source={require("../constants/tempbg.jpeg")}>
        <ScrollView>
          <View style={styles.container}>
            {/* Top Animated Image */}
            <View>
              <Text className="font-gentium text-white text-4xl mb-0 mt-10 font-semibold text-center relative top-[20px]">
                WELCOME TO AIUSENSE
              </Text>
            </View>
            <Animated.Image
              className={"rounded-lg mt-0"}
              source={require("../constants/prick.jpg")}
              style={[
                styles.image,
                {
                  transform: [{ translateY: topImagePosition }],
                },
              ]}
            />
            {/* Text Content */}
            <Text style={styles.title} className="text-center text-gred"></Text>
            <Text style={styles.subtitle} className="text-center">
              Sign in to experience seamless health monitoring with our innovative biosensor patch. Track your vitals effortlessly with real-time updates, painless microneedles, and wireless charging. Lightweight, water-resistant, and built for comfort—your health journey starts here.
            </Text>
            {/* Custom Button */}
            <View style={{ width: "100%", boxShadow: "4px" }}>
              <CustomButton
                title="Continue With Email"
                handlePress={() => {
                  router.replace("/Sign-in");
                }}
                containerStyles={"w-full mt-7 shadow-xl"}
              />
            </View>
          </View>
          <StatusBar backgroundColor="#ac4ab5" style="light" />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    height: "100%",
  },
  image: {
    width: 300,
    height: 300,
    position: "relative",
    top: -60,
  },
  title: {
    fontSize: 32,
    fontFamily: "Nunito",
    textShadowColor: "dimgrey",
    textShadowRadius: 3,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "white",
    fontFamily: "Nunito",
  },
});
