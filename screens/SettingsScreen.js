import React,  {Component} from 'react';
import { Text } from 'react-native';

export default class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  render(){
    return(
    <Text>Hello World</Text>
    )
  }
}

SettingsScreen.navigationOptions = {
  title: 'Register',
};
