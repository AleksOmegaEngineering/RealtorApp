import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Dimensions, Platform, PixelRatio, Image, AppRegistry } from 'react-native';
import * as Font from 'expo-font';

 function EntryCreator(props) {
  return(
    <View style={styles.fullEntry}>
    <View style={styles.entrySample}>
    <View style={styles.entryImageContainer}>
      <Image source={require("./assets/images/sampleHouse.jpg")} style={styles.entryImage}/>
    </View>

    <View style={styles.entryInformation}>
      <View style={styles.entryNameCont}>
        <Text style={styles.entryName} adjustsFontSizeToFit={true} numberOfLines={2}>4040 Sierra Rd, Grand Prairie, TX 75052</Text>
      </View>
      <View style={styles.entryDescriptionCont}>
        <Text style={styles.entryDescription} adjustsFontSizeToFit={true} numberOfLines={2}>3 bds 2 ba 1,239 sqft - House for sale</Text>
      </View>
    </View>
  </View>
  <View style={styles.seperator}>
  </View>
  </View>
  );
}

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
            <ScrollView style={styles.scrollView}>
              <EntryCreator/>
              <EntryCreator/>
              <EntryCreator/>
              <EntryCreator/>
              <EntryCreator/>
              <EntryCreator/>
              <EntryCreator/>

            </ScrollView>

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
    marginRight: "5%"
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
  entryImage:{
    resizeMode: "contain",
    // borderColor: "blue",
    // borderWidth: 5,
    height: "95%",
    width: "95%",
  },
  entryInformation:{
    flex: 2,
    // borderColor: "blue",
    // borderWidth: 5,
    flexDirection: 'column',
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
