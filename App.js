import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Platform, PixelRatio, Image, AppRegistry } from 'react-native';
import * as Font from 'expo-font';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

let headerWidth = 0;
let headerHeight = 0;

const AOBlue = "#080B47";

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
    dimensionsFound: true,
  };

  async find_dimesions(layout){
    const {x, y, width, height} = layout;
    console.warn("Width: " + width);
    headerWidth = width;
    console.warn("Height: " + height);
    headerHeight = height;
  }

  async loadFonts(){
    await Font.loadAsync({
      OpenSans: require("./assets/fonts/OpenSans.ttf"),
      OpenSansSemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
      BadGuyBlack: require("./assets/fonts/BadGuyBlack.ttf"),
    });
    this.setState({ fontsLoaded: true});
  }

  componentDidMount(){
    this.loadFonts();
  }

  render(){
    if(this.state.fontsLoaded){
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <StatusBar style={{ barStyle: "dark", backgroundColor: '#fff' }} />
          <View style={styles.header}>
            <View adjustsFontSizeToFit style={styles.imageContainer}>
              <Image style={styles.logo} source={require("./assets/images/fullAOLogo.png")}/>
            </View>
            <Text adjustsFontSizeToFit numberOfLines={1} onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }} style={styles.headerText}>ALEKS OMEGA</Text>
          </View>
          <View style={styles.scrollArea}>
            
          </View>
        </SafeAreaView>
      );
  }
    else{
      return(
        null
      );
    }
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    flex: 1,
    top: 0,
    backgroundColor: '#fff',
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
    fontFamily: 'OpenSansSemiBold',
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
    borderColor: "red",
    borderWidth: 5,
  },
});
