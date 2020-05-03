import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import { db } from '../constants/Database';

export default class CustomersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {customers: []};
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.getCustomers();
  });
  }

  getCustomers = async function (){
    return await fetch(db.epurl+'customers')
    .then(response => response.json())
    .then(customers => {
      this.setState({ customers });
    }) 
  }
  //<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  render(){
  return (
    <ScrollView style={styles.container}>
      
      {this.state.customers.map(customer => <Card style={styles.Card} key={customer.id} title={customer.fname+' '+customer.lname} onPress={()=>{this.props.navigation.navigate('Customer', {customerID: customer.id});}}>
      <Card.Content>
      <Title>{customer.fname+' '+customer.lname}</Title>
    </Card.Content>
    
    <Card.Actions>
    </Card.Actions>
        </Card>)}      
      
    </ScrollView>
  );
}
static navigationOptions = ({ navigation }) => {
  return{
  title: 'Customers',
  headerRight: (
    <View><Button
    onPress={() => {navigation.navigate('AddCustomer')}}
      fontWeight="bold"
      title="Add Customer"
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
