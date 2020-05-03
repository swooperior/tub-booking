import React from 'react';
import { ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import { db } from '../constants/Database';

export default class BookingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fname: '', lname: '', address:'', phone:''};
  }

  componentDidMount() {
    const { navigation } = this.props;

//     this.focusListener = navigation.addListener('didFocus', () => {
//       this.getBooking();
//   });
  }

  addCustomer = async function(){
    var customer = JSON.stringify({
        customer:{
            fname: this.state.fname,
            lname: this.state.lname,
            address: this.state.address,
            phone: this.state.phone
        }
    });
    console.log(customer);
    return await fetch(db.epurl+'customers/',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: customer})
    .then(this.props.navigation.pop())
  }


//   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> This will contain a map using the gelocation one day.
  render(){
  return (
    <ScrollView style={styles.container}>
    <Card>
      <Card.Content>
        <Title>Add a new customer</Title>
        <Paragraph>First Name</Paragraph>
        <TextInput placeholder="Customer First Name" value={this.state.fname} onChangeText={(newFname)=>{this.setState({fname: newFname})}} />
        <Paragraph>Last Name</Paragraph>
        <TextInput placeholder="Customer Last Name" value={this.state.lname} onChangeText={(newLname)=>{this.setState({lname: newLname})}} />
        <Paragraph>Address</Paragraph>
        <TextInput multiline placeholder="Customer Address" value={this.state.address} onChangeText={(newAddress)=>{this.setState({address: newAddress})}} />
        <Paragraph>Phone Number</Paragraph>
        <TextInput keyboardType='phone-pad' placeholder="Customer Phone Number" value={this.state.phone} onChangeText={(newPhone)=>{this.setState({phone: newPhone})}} />

    </Card.Content>
   <Card.Actions>
      <Button>Cancel</Button>
      <Button onPress={()=>this.addCustomer()}>Save</Button>
    </Card.Actions>
    </Card>     
      
    </ScrollView>
  );
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
