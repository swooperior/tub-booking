import React, {Component} from 'react';
import { View, ScrollView, Picker, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class AddBookingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inventory: []};
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.getAvailableItems();
  });
  }

  getAvailableItems = function(start_date=Date.now(),end_date=Date.now()){
      var sd = new Date(start_date).toISOString();
      var ed = new Date(end_date).toISOString();
      console.log(ed);
   // var b_id = this.props.navigation.getParam('bookingID')
    return fetch('http://192.168.1.156:3000/inventory/check?start='+sd+'&end='+ed)
      .then(response => response.json())
      .then(inventory => {
      this.setState({ inventory });
    });
  }
//   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> This will contain a map using the gelocation one day.
  render(){
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.Card}>
      <Title>Add a New Booking</Title>
      <Paragraph>Customer:</Paragraph>
      <Picker key="item"
        selectedValue={this.state.inventory}
        placeHolder={'Available Items'}
        style={{height: 50, width: 300}}
        onValueChange={(itemValue, itemIndex) =>
            this.setState({s_item: itemValue})
        }>
        {this.state.inventory.map(item => 
        <Picker.Item key={item.id} label={item.size+' '+item.name} value={item.id} />
        )}

    </Picker>
      <Paragraph>Start Date:</Paragraph>
      <Paragraph>End Date: </Paragraph>
      <Paragraph>Available to Book:</Paragraph>
      <Picker key="customer"
        selectedValue={this.state.inventory}
        placeHolder={'Customer'}
        style={{height: 50, width: 300}}
        onValueChange={(itemValue, itemIndex) =>
            this.setState({s_customer: itemValue})
        }>
        {this.state.inventory.map(item => 
        <Picker.Item key={item.id} label={item.size+' '+item.name} value={item.id} />
        )}

    </Picker>
      
      
   
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
        </Card>        
    </ScrollView>
  );
}
}

AddBookingScreen.navigationOptions = {
  title: 'New Booking',
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
