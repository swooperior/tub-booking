import React, {Component} from 'react';
import { View, Text, StyleSheet, Linking} from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';


export default class TaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tasks: []};
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.getBooking();
  });
  }

  getBooking = function(){
    var t_id = this.props.navigation.getParam('bookingID')
    return fetch('http://192.168.1.156:3000/task/'+t_id)
    .then(response => response.json())
    .then(tasks => { 
      this.setState({ tasks });
    })
  }

  deliverBooking = function(){
    var t_id = this.props.navigation.getParam('bookingID')
    return fetch('http://192.168.1.156:3000/booking/'+t_id+'/delivered')
    .then(() => { 
        alert('Marked as delivered!');
        return this.props.navigation.navigate('Tasks');
    })
  }

  collectBooking = function(){
    var t_id = this.props.navigation.getParam('bookingID')
    return fetch('http://192.168.1.156:3000/booking/'+t_id+'/collected')
    .then(() => { 
        alert('Marked as collected!');
      return this.props.navigation.navigate('Tasks');
    })
  }

  buttonAction = function(status){
      switch(status){
        case(0):
            return this.deliverBooking();
        case(2):
            return this.collectBooking();
      }
  }

  // <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  render(){
  return (
    <View style={styles.container}>
      
      {this.state.tasks.map(task => <Card style={styles.Card} key={task.id} title={task.c_id}>
      
      <Card.Content>
        <Title>#{task.id} - {task.fname} {task.lname}</Title>
        <Paragraph style={{alignSelf:'flex-end', fontWeight:'bold', fontSize:20}}>{gStatus(task.status)}</Paragraph>
        <Paragraph style={{fontSize:18,fontStyle:'italic'}}>{task.size} {task.itemName}</Paragraph>
        <Paragraph>{task.address}</Paragraph>
        <Paragraph onPress={()=>{Linking.openURL('tel:'+task.phone);}} style={{alignSelf:'flex-end', fontWeight:'bold', fontSize:20}}>{task.phone}</Paragraph>
      </Card.Content>
        <Card.Actions>
            <Button title={"Update Booking"} onPress={()=>{this.buttonAction(task.status)}}>Update Booking</Button>
        </Card.Actions>
      </Card>
      
      
      
      )}      
      
    </View>
  );
}
}

TaskScreen.navigationOptions = {
  title: 'Task',
};

function gStatus(status){
  switch(status){
    case 0:
      return(<Text style={{color:'yellow'}}>Deliver</Text>);
    case 1:
      return(<Text style={{color:'green'}}>Delivered</Text>);
    case 2:
      return(<Text style={{color:'red'}}>Collect</Text>);
    case 3:
      return(<Text style={{color:'darkgreen'}}>Complete</Text>);
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
  },
  buttonArea:{
    flexDirection:'row',
    flex:1,
  },
});
