import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import colors from "../config/colors";
import { Button } from "react-native-paper";
import { useStates } from "../hooks/useStates";
import firebase from "firebase";
import { auth } from "../config/firebase";

export default function ProfileScreen({ navigation }) {
  const { isLogged } = useStates();

  const handleCompetitionCreate = () => {
    navigation.navigate("CreateCompetition");
  };
  const { user } = firebase.auth().currentUser;
  return (
    <View style={styles.maincontainer}>
      <View style={styles.profileView}>
        <Image
          source={{ uri: auth.currentUser.photoURL }}
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>{auth.currentUser.displayName}</Text>
        <Text style={styles.profileEmail}>{auth.currentUser.email}</Text>
      </View>

      <View style={{ flex: 1 }}>
        {isLogged.role == "Head" && (
          <Button
            mode="contained"
            onPress={handleCompetitionCreate}
            style={{
              backgroundColor: colors.primary,
              width: "70%",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            Create a competition
          </Button>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  maincontainer: { flex: 1, backgroundColor: colors.white },
  profileView: {
    height: 300,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    height: 130,
    width: 130,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 10,
    backgroundColor: "grey",
  },
  profileEmail: {
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
  },
  profileName: {
    fontSize: 22,
    color: colors.white,
    fontWeight: "bold",
    marginTop: 10,
  },
});
