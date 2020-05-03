import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import { db } from '../constants/Database';

export default class InventoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inventory: []};
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.getItems();
  });
  }
    

  getItems = function(){
    return fetch(db.epurl+'inventory')
    .then(response => response.json())
    .then(inventory => {
      this.setState({ inventory });
    }) 
  }
  //<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  render(){
  return (
    <ScrollView style={styles.container}>
      
      {this.state.inventory.map(item => <Card style={styles.Card} key={item.id} title={item.name+' '+item.description}>
      <Card.Content>
      <Title>{item.name}</Title>
      <Paragraph>{item.description}</Paragraph>
    </Card.Content>
    
    <Card.Actions>

    </Card.Actions>
        </Card>)}      
      
    </ScrollView>
  );
}
static navigationOptions = ({ navigation }) => {
  return{
  title: 'Inventory',
  headerRight: (
    <View><Button
    onPress={() => {navigation.navigate('AddItem')}}
      fontWeight="bold"
      title="Add Booking"
      color="#000"
    >+</Button></View>
  ),
};
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#eee',
  },
  Card: {
    elevation:10,
    margin:5,
  },
  Text:{
    fontSize:10,
    fontWeight:'bold',
  }
});
