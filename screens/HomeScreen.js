import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  Dimensions,
  TextInput,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';


import * as AppStyles from '../Styles/Buttons';

const ButtonStyles = AppStyles.importedStyles;

export default class HomeScreen extends React.Component{
  render(){
  return (
    <View style={styles.container}>
      <View style={{textAlign:'center',alignItems:'center',flexDirection:'column', flex:1}}>
        <Image source={require('../assets/images/chthlogo.jpg')} style={{marginBottom:20, width: 200, height: 200}}/>
        <TextInput style={styles.textinputstyle} placeholder="Username"></TextInput>
        <TextInput style={styles.textinputstyle} secureTextEntry={true} placeholder="Password"></TextInput>
      </View>
      <View style={styles.buttonArea} >
      <TouchableNativeFeedback
        onPress={() => this.props.navigation.navigate('Tasks')}
        background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={ButtonStyles.viewbuttonStyle}>
            <Text style={ButtonStyles.textbuttonStyle} >Log In</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
        onPress={() => this.props.navigation.navigate('Settings')}
        background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={ButtonStyles.viewbuttonStyle}>
            <Text style={ButtonStyles.textbuttonStyle}>Register</Text>
          </View>
        </TouchableNativeFeedback>
      </View>   
    </View>
  );
}


}

HomeScreen.navigationOptions = {
  header:null,

};

function handleLoginPress() {
  alert('Logging you in...');
  WebBrowser.openBrowserAsync(
    'https://rhinoweb.co.uk'
  );
  
}





const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    flex: 1,
    backgroundColor: '#fff',
    margin:10,
    paddingTop:50
  },
  textinputstyle: {
    backgroundColor:'#EEE',
    flex:1,
    marginBottom:2,
    width:'100%',
    color:'#000',
    borderRadius:3,
    textAlign:'center',
    fontSize:15
  },
  buttonArea:{
    flexDirection:'row',
    flex:1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  }
});

