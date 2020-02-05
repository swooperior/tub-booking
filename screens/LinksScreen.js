import React, {Component} from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {customers: []};
  }

  componentDidMount() {
    return fetch('http://192.168.1.55:3000/customers')
    .then(response => response.json())
    .then(customers => {
      this.setState({ customers });
    }) 
  }
  
  render(){
  return (
    <ScrollView style={styles.container}>
      
      {this.state.customers.map(customer => <Card style={styles.Card} key={customer.id} title={customer.fname+' '+customer.lname}>
      <Card.Content>
      <Title>{customer.fname+' '+customer.lname}</Title>
      <Paragraph>{customer.address}</Paragraph>
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

LinksScreen.navigationOptions = {
  title: 'Customers',
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
