import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Platform,
  PixelRatio,
  Image,
  AppRegistry,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native-gesture-handler";

let sampleName = [
  "4040 Sierra Rd, Grand Prairie, TX 75052",
  "4041 Sierra Rd, Grand Prairie, TX 75052",
  "4042 Sierra Rd, Grand Prairie, TX 75052",
];
let sampleDescription = [
  "3 bds 2 ba 1,239 sqft - House for sale",
  "3 bds 2 ba 1,239 sqft - House for sale",
  "3 bds 2 ba 1,239 sqft - House for sale",
];
const AOBlue = "#080B47";

// async function fetchData(){
//   let response = await fetch("http://192.168.1.139:4545/properties");
//   let data = await response.json();
//   console.log(data);
//   return data;
// }

function Header(props) {
  return (
    <View style={styles.header}>
      <View adjustsFontSizeToFit style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={require("./assets/images/fullAOLogo.png")}
        />
      </View>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerText}>
        ALEKS OMEGA
      </Text>
    </View>
  );
}

export class HomeScreen extends React.Component {
  state = {
    data: [],
    propertiesComponent: [],
  };
  async fetchData() {
    let response = await fetch("http://192.168.1.139:4545/properties");
    let newData = await response.json();
    // console.log(newData[0][0]);
    this.setState({ data: newData });
  }
  componentDidMount() {
    this.fetchData().then(() =>{
      properties = []
      for (let i = 0; i < this.state.data.length; i++) {
        properties.push(
        <TouchableOpacity
          style={styles.fullEntry}
          onPress={() => this.props.navigation.navigate("Information")}
          key={i}
        >
          <View style={styles.entrySample}>
            <View style={styles.entryImageContainer}>
              <Image
                source={require("./assets/images/sampleHouse.jpg")}
                style={styles.entryImage}
              />
            </View>
            <View style={styles.entryInformation}>
              <View style={styles.entryNameCont}>
                <Text
                  style={styles.entryName}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                >
                  {this.state.data[i][0]}
                </Text>
              </View>
              <View style={styles.entryDescriptionCont}>
                <Text
                  style={styles.entryDescription}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                >
                  {this.state.data[i][1]}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.seperator}></View>
        </TouchableOpacity>
        )
      }
      this.setState({propertiesComponent: properties});
    });
  }
  render(){
    return(
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar style={{ barStyle: "dark", backgroundColor: "#ffff" }} />
        <Header />
        <View style={styles.scrollArea}>
          <ScrollView style={styles.scrollView}>{this.state.propertiesComponent}</ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

function Information(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HELLO WORLD</Text>
    </View>
  );
}
function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Information" component={Information} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      OpenSans: require("./assets/fonts/OpenSans.ttf"),
      OpenSansSemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
      BadGuyBlack: require("./assets/fonts/BadGuyBlack.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (this.state.fontsLoaded) {
      return <Navigation />;
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    flex: 1,
    top: 0,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderBottomColor: AOBlue,
    borderWidth: 0,
    borderBottomWidth: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  imageContainer: {
    margin: 2,
    // borderColor: "red",
    // borderWidth: 5,
    maxHeight: 67,
    width: 67,
  },
  logo: {
    resizeMode: "contain",
    // borderColor: "blue",
    // borderWidth: 5,
    height: "100%",
    width: "100%",
  },
  headerText: {
    margin: 5,
    fontFamily: "OpenSansSemiBold",
    fontSize: 300,
    color: AOBlue,
    // borderColor: "red",
    // borderWidth: 5,
  },
  safeAreaView: {
    flex: 1,
  },
  scrollArea: {
    flex: 8,
    // borderColor: "red",
    // borderWidth: 5,
  },
  scrollView: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 5,
  },
  fullEntry: {
    height: 100,
    // borderColor: "purple",
    // borderWidth: 5,
  },
  entrySample: {
    flex: 1,
    // borderColor: "pink",
    // borderWidth: 5,
    flexDirection: "row",
  },
  seperator: {
    backgroundColor: "rgb(180,180,180)",
    height: 2,
    maxWidth: "100%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  entryImageContainer: {
    // height: "100%",
    // width: "33%",
    flex: 1,
    // borderColor: "red",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  entryImage: {
    resizeMode: "contain",
    // borderColor: "blue",
    // borderWidth: 5,
    height: "95%",
    width: "95%",
  },
  entryInformation: {
    flex: 2,
    // borderColor: "blue",
    // borderWidth: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  entryNameCont: {
    flex: 1,
    marginHorizontal: "5%",
    // borderColor: "black",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  entryName: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "OpenSans",
  },
  entryDescription: {
    fontSize: 10,
    // textAlign: "center",
    // textAlignVertical: "center",
    fontFamily: "OpenSans",
  },
  entryDescriptionCont: {
    flex: 1,
    marginHorizontal: "5%",
    // borderColor: "brown",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
