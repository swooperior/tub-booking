import React from 'react';
import { ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import { db } from '../constants/Database';

export default class BookingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {iname: '', idesc: ''};
  }

  componentDidMount() {
    const { navigation } = this.props;

//     this.focusListener = navigation.addListener('didFocus', () => {
//       this.getBooking();
//   });
  }

  addItem = async function(){
    var item = JSON.stringify({item:{name: this.state.iname, description: this.state.idesc}});
    console.log(item);
    return await fetch(db.epurl+'inventory/',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: item})
    .then(this.props.navigation.pop())
  }


//   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> This will contain a map using the gelocation one day.
  render(){
  return (
    <ScrollView style={styles.container}>
    <Card>
      <Card.Content>
        <Title>Add a new item</Title>
        <TextInput placeholder="Item Name" value={this.state.iname} onChangeText={(newName)=>{this.setState({iname: newName})}} />
        <TextInput placeholder="Item Description" value={this.state.idesc} onChangeText={(newDesc)=>{this.setState({idesc: newDesc})}} />

    </Card.Content>
   <Card.Actions>
      <Button>Cancel</Button>
      <Button onPress={()=>this.addItem()}>Save</Button>
    </Card.Actions>
    </Card>     
      
    </ScrollView>
  );
}
}

BookingScreen.navigationOptions = {
  title: 'Add Inventory',
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
