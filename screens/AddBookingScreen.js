import React, {Component} from 'react';
import { View, ScrollView, Picker, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import { db } from '../constants/Database';

export default class AddBookingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inventory: [], customers: [], s_item:null, s_customer:null, s_date:this.getToday(), e_date:this.getToday()};
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      try{
        this.getAvailableItems();
        this.getCustomers();
      }catch(e){
        console.log(e);
      }    
  });
  }

  getToday = function(){
    var today = new Date(Date.now()).toISOString().substr(0,10);
    return today;
  }

  getAvailableItems = async function(start_date=Date.now(),end_date=Date.now()){
      var sd = new Date(start_date).toISOString().substr(0,10);
      var ed = new Date(end_date).toISOString().substr(0,10);
   // var b_id = this.props.navigation.getParam('bookingID')
    return await fetch(db.epurl+'inventory/check?s='+sd+'&e='+ed)
      .then(response => response.json())
      .then(inventory => {
      this.setState({ inventory });
    });
  }

  getCustomers = async function(){
  return await fetch(db.epurl+'customers')
    .then(response => response.json())
    .then(customers => {
    this.setState({ customers });
  });
}

addBooking = async function(){
  var booking = JSON.stringify({
    booking:{
      c_id: this.state.s_customer,
      i_id: this.state.s_item,
      start_date: this.state.s_date,
      end_date: this.state.e_date,
      date_booked: this.getToday()
    }})

  return await fetch(db.epurl+'booking',{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    body:booking
  })
  .then(this.props.navigation.pop())
}

//   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> This will contain a map using the gelocation one day.
  render(){
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.Card}>
      <Title>Add a New Booking</Title>
      <Paragraph>Customer:</Paragraph>
      <Picker key="customer"
        selectedValue={this.state.s_customer}
        placeHolder={'Select a customer'}
        style={{height: 50, width: 300}}
        value={this.state.s_customer}
        onValueChange={(customerValue, itemIndex) =>{
            this.setState({s_customer: customerValue})
        }
        }>
        {this.state.customers.map(customer => 
        <Picker.Item key={customer.id} label={customer.fname+' '+customer.lname} value={customer.id} />
        )}  
        

    </Picker>
      <Paragraph>Start Date:</Paragraph>
      <DatePicker 
        date={this.state.s_date}
        mode="date"
        //minDate={this.getToday()}
        onDateChange={(ns_date) => {
          this.setState({s_date: ns_date})
          this.getAvailableItems(this.state.s_date,this.state.e_date)
        }}
      />
      <Paragraph>End Date: </Paragraph>
      <DatePicker 
        date={this.state.e_date}
        mode="date"
        mindate={this.state.s_date}
        onDateChange={(ne_date) => {
          this.setState({e_date: ne_date});
          this.getAvailableItems(this.state.s_date,this.state.e_date)
        }}
      />

      <Paragraph>Available to Book:</Paragraph>
      <Picker key="item"
        selectedValue={this.state.s_item}
        placeHolder={'Item'}
        style={{height: 50, width: 300}}
        value={this.state.s_item}
        onValueChange={(itemValue, itemIndex) =>{
            this.setState({s_item: itemValue})
        }
        }>
        {this.state.inventory.map(item => 
        <Picker.Item key={item.id} label={item.name} value={item.id} />
        )}

    </Picker>
      
      
   
    <Card.Actions>
      <Button>Cancel</Button>
      <Button onPress={()=>{
        this.addBooking()
      }}>Add Booking</Button>
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
