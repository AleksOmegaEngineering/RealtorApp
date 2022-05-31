import React, { useState, useEffect, useRef } from "react";
import * as Font from "expo-font";
import {
  Animated,
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
  Easing,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  Touchable
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AOBlue = "#080B47";


const RotateCwView = (props) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0.2)).current;


  React.useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false
        }),
        Animated.sequence([
          Animated.timing(fadeValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false
          }),
          Animated.timing(fadeValue, {
            toValue: 0.2,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false
          }),
        ])
      ])
    ).start();
  }, [spinValue, fadeValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        transform:
          [
            { rotate: spin }
          ],
        opacity: fadeValue,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

const Fadein = (props) => {
  const fadeValue = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [fadeValue]);
  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeValue,
      }}>
      {props.children}
    </Animated.View>
  );
}

export class EntryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      propertiesComponent: [],
      image: null,
      propertiesLoaded: false,
      timer: false,
      textInputValue: "",
      useTextInput: false,
    };
  }
  renderItem = ({ itemObj }) => {
    <Entries item={itemObj} />
  }
  searchListener = () => {
    // const { textInputValue } = this.state;
    this.setState((state) => {
      return { useTextInput: !(state.useTextInput) }
    });
    // console.log(this.state.textInputValue);
  }
  clearInput = () => {
    this.setState({ textInputValue: "" });
  }
  handleScroll = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  }
  Header = (props) => {
    if (this.state.textInputValue == "") {
      return (
        <View style={styles.headerBig}>
          <View style={styles.header}>
            <View adjustsFontSizeToFit style={styles.imageContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/images/fullAOLogo.png")}
              />
            </View>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerText}>
              ALEKS OMEGA
            </Text>
          </View>
          <View style={styles.searchSortContainer}>
            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={styles.searchImageContainer}
                onPress={this.searchListener}>
                <Image
                  style={styles.searchImage}
                  source={require("../assets/images/search.png")}
                />
              </TouchableOpacity>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  value={this.state.textInputValue}
                  onChangeText={textInputValue => this.setState({ textInputValue })}
                  returnKeyType="search"
                />
              </View>
            </View>
            <View style={styles.filterContainer}>
              <Image
                style={styles.filterImage}
                source={require("../assets/images/filter.png")}
              />
            </View>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.headerBig}>
          <View style={styles.header}>
            <View adjustsFontSizeToFit style={styles.imageContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/images/fullAOLogo.png")}
              />
            </View>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerText}>
              ALEKS OMEGA
            </Text>
          </View>
          <View style={styles.searchSortContainer}>
            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={styles.searchImageContainer}
                onPress={this.searchListener}>
                <Image
                  style={styles.searchImage}
                  source={require("../assets/images/search.png")}
                />
              </TouchableOpacity>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  value={this.state.textInputValue}
                  onChangeText={textInputValue => this.setState({ textInputValue })}
                  returnKeyType="search"
                />
              </View>
              <Pressable style={styles.closeContainer} onPress={this.clearInput}>
                <Fadein>
                  <Image
                    style={styles.closeImage}
                    source={require("../assets/images/close.png")}
                  />
                </Fadein>
              </Pressable>
            </View>
            <View style={styles.filterContainer}>
              <Image
                style={styles.filterImage}
                source={require("../assets/images/filter.png")}
              />
            </View>
          </View>
        </View>
      );
    }
  }
  async fetchData(parameters = "") {
    let fetchURL = "http://192.168.1.110:4545/properties"
    if (parameters == "") {
    }
    else {
      fetchURL = fetchURL + "/" + parameters;
    }
    let response = await fetch(fetchURL);
    let newData = await response.json();
    // console.log(newData);
    this.setState({ data: newData });
  }
  Entries = (props) => {
    let properties = []
    for (let i = 0; i < this.state.data.length; i++) {
      properties.push(
        <TouchableOpacity
          style={styles.fullEntry}
          onPress={() => this.props.navigation.navigate("Information", {
            name: this.state.data[i].name,
          })}
          key={i}
        >
          <View style={styles.entrySample}>
            <View style={styles.entryImageContainer}>
              <Image
                source={{
                  uri: `data:image/gif;base64,${this.state.data[i].profile_image}`,
                }}
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
                  {this.state.data[i].name}
                </Text>
              </View>
              <View style={styles.entryDescriptionCont}>
                <Text
                  style={styles.entryDescription}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                >
                  {this.state.data[i].description}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.seperator}></View>
        </TouchableOpacity>
      );
    }
    this.setState({ propertiesComponent: properties });
    this.setState({ propertiesLoaded: true });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ timer: true });
    }, 1500);
    this.fetchData()
      .then(() => {
        this.Entries();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.textInputValue !== this.state.textInputValue) {
      this.setState({ timer: false });
      this.setState({ propertiesLoaded: false })
      console.log("UPDATED");
      setTimeout(() => {
        this.setState({ timer: true });
      }, 1500);
      this.fetchData(this.state.textInputValue)
        .then(() => {
          this.Entries();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  render() {
    console.log(this.state.textInputValue);
    if (!(this.state.propertiesLoaded && this.state.timer)) {
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <StatusBar style={{ barStyle: "dark", backgroundColor: "#ffff" }} />
          <this.Header />
          <View style={styles.scrollArea}>
            <ScrollView style={styles.scrollView}>
              <RotateCwView style={styles.loadingLogoBigContainer}>
                <Image
                  style={styles.loadingLogo}
                  source={require("../assets/images/AO.png")}
                />
              </RotateCwView >
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
    else {
      if (this.state.data.length == 0) {
        return (
          <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style={{ barStyle: "dark", backgroundColor: "#ffff" }} />
            <this.Header />
            <View style={styles.scrollArea}>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.entryName}>
                  Nothing was found!
                </Text>
              </View>
            </View>
          </SafeAreaView>
        );
      }
      else {
        return (
          <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style={{ barStyle: "dark", backgroundColor: "#ffff" }} />
            <this.Header />
            <View style={styles.scrollArea}>
              <ScrollView style={styles.scrollView}>
                {this.state.propertiesComponent}
              </ScrollView>
            </View>
          </SafeAreaView>
        );
      }
    }
  }
}

function Information({ route, navigation }) {
  const { name } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{name}</Text>
    </View>
  );
}
async function loadFonts() {
  await Font.loadAsync({
    OpenSans: require("../assets/fonts/OpenSans.ttf"),
    OpenSansSemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
    BadGuyBlack: require("../assets/fonts/BadGuyBlack.ttf"),
  });
}
export default function HomeScreen() {
  const [loaded] = Font.useFonts({
    OpenSans: require("../assets/fonts/OpenSans.ttf"),
    OpenSansSemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
    BadGuyBlack: require("../assets/fonts/BadGuyBlack.ttf")
  });
  if (!loaded) {
    return null;
  }
  else {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={EntryScreen}
          />
          <Stack.Screen options={{ headerShown: false }} name="Information" component={Information} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  headerBig: {
    flexDirection: "column",
    flex: 2,
    top: 0,
    backgroundColor: "#fff",
    borderColor: "#fff",
    // borderColor: AOBlue,
    // borderWidth: 5,
    // borderBottomWidth: 40,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 5,
  },
  header: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: "row",
    flex: 5,
    width: "100%",
    top: 0,
    backgroundColor: "#fff",
    // borderColor: "red",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    margin: 2,
    // borderColor: "red",
    // borderWidth: 5,
    maxHeight: 67,
    width: 67,
    marginLeft: 75
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
    marginRight: 75,
  },
  searchSortContainer: {
    flexDirection: "row",
    flex: 2.5,
    // borderColor: AOBlue,
    // borderWidth: 5,
    width: "100%",
    backgroundColor: AOBlue,
  },
  searchContainer: {
    marginLeft: "2%",
    marginRight: "5%",
    flexDirection: "row",
    flex: 10,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

  },
  searchImageContainer: {
    height: "100%",
    flex: 1,
    // borderWidth: 5,
    // borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  searchImage: {
    height: "60%",
    // borderColor: "white",
    // borderWidth: 5,
    maxWidth: "100%",
    resizeMode: "contain"
  },
  searchInputContainer: {
    height: "70%",
    marginLeft: "2%",
    // borderWidth: 3,
    borderBottomWidth: 1,
    borderColor: "white",
    flex: 9,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    height: "100%",
    width: "90%",
    // borderColor: "white",
    // borderWidth: 5,
  },
  closeContainer: {
    position: "absolute",
    // borderColor: "red",
    // borderWidth: 1,
    maxWidth: "7%",
    height: "70%",
    // flex: 1,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  closeImage: {
    height: "100%",
    maxWidth: "100%",
    resizeMode: "contain"
  },
  filterContainer: {
    marginRight: "2%",
    height: "100%",
    flex: 1,
    // borderWidth: 5,
    // borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  filterImage: {
    height: "55%",
    // borderColor: "white",
    // borderWidth: 5,
    maxWidth: "100%",
    resizeMode: "contain"
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollArea: {
    flex: 8,
    backgroundColor: "white",
    // borderColor: "red",
    // borderWidth: 5,
  },
  scrollView: {
    flex: 1,
  },
  loadingLogoBigContainer: {
    // borderColor: "red",
    // borderWidth: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingLogo: {
    alignSelf: "center",
    resizeMode: "contain",
    // borderColor: "blue",
    // borderWidth: 5,
    maxHeight: "10%",
    maxWidth: "10%",
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
    marginLeft: "5%"
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
  datalessView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  datalessText: {
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "OpenSans",
  }
});
