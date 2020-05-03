import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';


// Uncomment when screen navigation is complete.
import TasksScreen from '../screens/TasksScreen';
 import TaskScreen from '../screens/TaskScreen';

import BookingsScreen from '../screens/BookingsScreen';
import BookingScreen from '../screens/BookingScreen';
import AddBookingScreen from '../screens/AddBookingScreen';
// import EditBookingScreen from '../screens/EditBookingScreen';

import CustomersScreen from '../screens/CustomersScreen';
import CustomerScreen from '../screens/CustomerScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
// import EditCustomerScreen from '../screens/EditCustomerScreen';

import InventoryScreen from '../screens/InventoryScreen';
// import InventoryDetailScreen from '../screens/InventoryDetailScreen';
import AddInventoryScreen from '../screens/AddInventoryScreen';
// import EditItemScreen from '../screens/EditItemScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarVisible:false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const TasksStack = createStackNavigator(
  {
    Tasks: TasksScreen,
    Task: TaskScreen,
  },
  config
);

TasksStack.navigationOptions = {
  tabBarLabel: 'Tasks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

TasksStack.path = '';

const BookingsStack = createStackNavigator(
  {
    Bookings: BookingsScreen,
    Booking: BookingScreen,
    AddBooking: AddBookingScreen,
  },
  config
);

BookingsStack.navigationOptions = {
  tabBarLabel: 'Bookings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

 BookingsStack.path = '';

const CustomersStack = createStackNavigator(
  {
    Customers: CustomersScreen,
    Customer: CustomerScreen,
    AddCustomer: AddCustomerScreen,
    // EditCustomer: EditCustomerScreen
  },
  config
);

CustomersStack.navigationOptions = {
  tabBarLabel: 'Customers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

CustomersStack.path = '';

const InventoryStack = createStackNavigator(
  {
    Inventory: InventoryScreen,
    // Item: ItemScreen,
    AddItem: AddInventoryScreen,
    // EditItem: EditItemScreen
  },
  config
);

InventoryStack.navigationOptions = {
  tabBarLabel: 'Inventory',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

InventoryStack.path = '';


//----------------Tab navigator stuffs
const tabNavigator = createBottomTabNavigator({
  TasksStack,
  BookingsStack,
  CustomersStack,
  InventoryStack,
});

tabNavigator.path = '';

export default tabNavigator;
