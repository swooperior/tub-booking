import React, {Component} from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import { ExpoLinksView } from '@expo/samples';
import { db } from '../constants/Database';

export default class BookingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bookings: []};
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.getBooking();
  });
  }

  getBooking = function(){
    var b_id = this.props.navigation.getParam('bookingID')
    return fetch(db.epurl+'booking/'+b_id)
      .then(response => response.json())
      .then(bookings => {
      this.setState({ bookings });
    });
  }
//   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> This will contain a map using the gelocation one day.
  render(){
  return (
    <ScrollView style={styles.container}>
      
      {this.state.bookings.map(booking => <Card style={styles.Card} key={booking.id} title={booking.fname+' '+booking.lname}>
      <Card.Content>
      <Title>{booking.id+' - '+booking.date_booked}</Title>
      <Paragraph>Deliver: {booking.start_date}</Paragraph>
      <Paragraph>Collect: {booking.end_date}</Paragraph>
    </Card.Content>
   
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
        </Card>)}      
      
    </ScrollView>
  );
}
}

BookingScreen.navigationOptions = {
  title: 'Booking',
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
