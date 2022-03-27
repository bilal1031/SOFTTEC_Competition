import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import colors from "../config/colors";
import { auth } from "../config/firebase";
import TagItem from "../components/TagItem";
import Section from "../components/Section";
import firebase from "firebase";
import { useStates } from "../hooks/useStates";

const { width: screenWidth } = Dimensions.get("window");

function HomeScreen({}) {
  const [webDev, setWebDev] = useState([]);
  const [appDev, setAppDev] = useState([]);
  const [programming, setProgramming] = useState([]);
  const [gaming, setGaming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const { eventTimings, setEventTimings } = useStates();

  const data = [
    {
      illustration:
        "https://firebasestorage.googleapis.com/v0/b/softech-nu.appspot.com/o/promotions%2Fpic1.PNG?alt=media&token=6ccb642e-cd32-4def-9788-055ee849abec",
    },
    {
      illustration:
        "https://firebasestorage.googleapis.com/v0/b/softech-nu.appspot.com/o/promotions%2Fpic2.jpg?alt=media&token=1c3d08c9-0375-4fee-86f3-746b4a9b5265",
    },
    {
      illustration:
        "https://firebasestorage.googleapis.com/v0/b/softech-nu.appspot.com/o/promotions%2Fpic3.jpg?alt=media&token=86244022-63fa-4da8-bbd7-ef61a08a8c63",
    },
  ];

  useEffect(() => {
    let temp1 = [];

    firebase
      .firestore()
      .collection("competitions")
      .onSnapshot((snapshot) => {
        if (snapshot.empty) return;
        temp1 = [];

        snapshot.forEach((item) => {
          temp1.push({ ...item.data(), id: item.id });
        });

        setList(temp1);
        setEventTimings(temp1);
        setLoading(false);
      });
  }, []);

  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 15 }}>
        <View>
          <TagItem
            title="Announcements & Promotions"
            icon={<FontAwesome5 name="bullhorn" size={20} color="white" />}
            bgColor="tomato"
            style={{ width: 330 }}
          />

          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 30}
            data={data}
            renderItem={_renderItem}
            hasParallaxImages={true}
            autoplay={true}
            loop={true}
          />
        </View>
        <View>
          <TagItem
            title="Competitons"
            bgColor="gold"
            icon={<Foundation name="trophy" size={24} color="white" />}
          />

          {loading ? (
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <>
              <Section
                sectionTitle="App Development"
                flatListData={list.filter(
                  (item) => item.category === "App Dev"
                )}
              />
              <Section
                sectionTitle="Web Development"
                flatListData={list.filter(
                  (item) => item.category === "Web Dev"
                )}
              />
              <Section
                sectionTitle="Programming"
                flatListData={list.filter(
                  (item) => item.category === "Programming"
                )}
              />
              <Section
                sectionTitle="Gaming"
                flatListData={list.filter((item) => item.category === "Gaming")}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  item: {
    width: screenWidth - 20,
    height: screenWidth - 140,
    margin: 10,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});

export default HomeScreen;
