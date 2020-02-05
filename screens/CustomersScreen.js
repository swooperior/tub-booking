import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {customers: []};
  }

  componentDidMount() {
    return fetch('http://192.168.1.156:3000/customers')
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

CustomersScreen.navigationOptions = {
  title: 'Customers',
  headerRight: (
    <View><Button
      onPress={() => alert('This is a button!')}
      fontWeight="bold"
      title="Add Customer"
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
