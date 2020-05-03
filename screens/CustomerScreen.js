import React from 'react';
import { ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import { db } from '../constants/Database';

export default class BookingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {customer: {}};
  }

  componentDidMount() {
    const { navigation } = this.props; 

    this.focusListener = navigation.addListener('didFocus', () => {
      this.getCustomer();
  });
  }


  getCustomer = async function (){
    var c_id = this.props.navigation.getParam('customerID');
    return await fetch(db.epurl+'customer/'+c_id)
    .then(response => response.json())
    .then(c => {
        this.setState({customer: c[0]})
    })
  }


//   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> This will contain a map using the gelocation one day.
  render(){
  return (
    <ScrollView style={styles.container}>
    <Card>
      <Card.Content>
        <Title>Customer Details</Title>
        <Paragraph>First Name</Paragraph>
        <TextInput placeholder="Customer First Name" value={this.state.customer.fname} onChangeText={(newFname)=>{this.setState({fname: newFname})}} />
        <Paragraph>Last Name</Paragraph>
        <TextInput placeholder="Customer Last Name" value={this.state.customer.lname} onChangeText={(newLname)=>{this.setState({lname: newLname})}} />
        <Paragraph>Address</Paragraph>
        <TextInput multiline placeholder="Customer Address" value={this.state.customer.address} onChangeText={(newAddress)=>{this.setState({address: newAddress})}} />
        <Paragraph>Phone Number</Paragraph>
        <TextInput keyboardType='phone-pad' placeholder="Customer Phone Number" value={this.state.customer.phone} onChangeText={(newPhone)=>{this.setState({phone: newPhone})}} />

    </Card.Content>
   <Card.Actions>
      <Button onPress={()=>this.props.navigation.pop()}>Cancel</Button>
      <Button onPress={()=>this.props.navigation.pop()}>Save</Button>
    </Card.Actions>
    </Card>     
      
    </ScrollView>
  );
}
static navigationOptions = ({ navigation }) => {
    return{
    title: 'Edit Customer',
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
