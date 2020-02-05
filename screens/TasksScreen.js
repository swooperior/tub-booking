import React, {Component} from 'react';
import { ScrollView, RefreshControl, Text, StyleSheet, Actions } from 'react-native';
import { Card, Avatar, Button, Paragraph, Title } from 'react-native-paper';

export default class TasksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tasks: []};
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.updateBookings();
  });
  }

  updateBookings = function(){
    return fetch('http://192.168.1.156:3000/tasks')
    .then(response => response.json())
    .then(tasks => { 
      this.setState({ tasks });
      console.log('Should have refreshed.')
    })
  }

  // <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  render(){
  return (
    <ScrollView style={styles.container}>
      
      {this.state.tasks.map(task => <Card style={styles.Card} key={task.id} title={task.c_id} onPress={()=>{this.props.navigation.navigate('Task', {bookingID: task.id});}}>
      
      
      <Card.Content>
        <Title>#{task.id} - {task.fname} {task.lname}</Title>
        <Paragraph style={{alignSelf:'flex-end', fontWeight:'bold', fontSize:20}}>{gStatus(task.status)}</Paragraph>
        <Paragraph style={{fontSize:18,fontStyle:'italic'}}>{task.size} {task.itemName}</Paragraph>
        <Paragraph>{task.address}</Paragraph>
      </Card.Content>
      </Card>)}      
      
    </ScrollView>
  );
}
}
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

TasksScreen.navigationOptions = {
  title: 'Tasks -'+today,
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
  }
});
