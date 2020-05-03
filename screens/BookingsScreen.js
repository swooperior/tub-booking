import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import { db } from '../constants/Database';

export default class BookingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bookings: []};
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.getBookings();
  });
  }

  getBookings = function(){
    return fetch(db.epurl+'bookings')
    .then(response => response.json())
    .then(bookings => {
      this.setState({ bookings });
    }) 
  }
//   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> This will contain a map using the gelocation one day.
  render(){
  return (
    <ScrollView style={styles.container}>
      
      {this.state.bookings.map(booking => <Card style={styles.Card} key={booking.id} title={booking.fname+' '+booking.lname} onPress={()=>{this.props.navigation.navigate('Booking', {bookingID: booking.id});}}>
      <Card.Content>
      <Title>{booking.id+' - '+booking.fname+' '+ booking.lname}</Title>
      <Paragraph>Deliver: {booking.start_date}</Paragraph>
      <Paragraph>Collect: {booking.end_date}</Paragraph>
    </Card.Content>
        </Card>)}      
      
    </ScrollView>
  );
}
static navigationOptions = ({ navigation }) => {
  return{
  title: 'Bookings',
  headerRight: (
    <View><Button
    onPress={() => {navigation.navigate('AddBooking')}}
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
