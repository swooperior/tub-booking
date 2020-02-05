import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';

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
    return fetch('http://192.168.1.156:3000/inventory')
    .then(response => response.json())
    .then(inventory => {
      this.setState({ inventory });
    }) 
  }
  
  render(){
  return (
    <ScrollView style={styles.container}>
      
      {this.state.inventory.map(item => <Card style={styles.Card} key={item.id} title={item.fname+' '+item.lname}>
      <Card.Content>
      <Title>{item.fname+' '+item.lname}</Title>
      <Paragraph>{item.address}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
        </Card>)}      
      
    </ScrollView>
  );
}
}

InventoryScreen.navigationOptions = {
  title: 'Inventory',
  headerRight: (
    <View><Button
      onPress={() => alert('This is a button!')}
      fontWeight="bold"
      title="Add Item"
      color="#000"
    >+</Button></View>
  ),
};


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
