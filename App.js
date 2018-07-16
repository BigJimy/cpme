import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Header from './components/Header';
import ListActus from './components/ListActus';
import ListEvent from './components/ListEvent';
import Parameters from './components/Parameters';
import { Feather } from '@expo/vector-icons';


class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
           <Header />
           <ListActus />
        </View>
     </ScrollView>
    );
  }
}

class EventsScreen extends React.Component {
  render() {
    return (
			<ScrollView>
				<View style={styles.mainContainer}>
           <Header />
           <ListEvent status={Math.random()}/>
        </View>
			</ScrollView>
        
    );
  }
}

class ParamsScreen extends React.Component {
  render() {
    return (
        <ScrollView>
           <View style={styles.mainContainer}>
               <Header />
               <Parameters />
            </View> 
        </ScrollView>
        
    );
  }
}

export default createBottomTabNavigator({
  Home: { 
      screen: HomeScreen,
      navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => (
          <Feather style={styles.icon} name="home" size={32} color="white" />
          )
      })
  },     
  Evénements: { 
      screen: EventsScreen,
      navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => (
          <Feather style={styles.icon} name="calendar" size={32} color="white" />
          )
      })
  },  
  Paramètres: { 
      screen: ParamsScreen,
      navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => (
          <Feather style={styles.icon} name="settings" size={32} color="white" />
          )
      })
  },
}, {
  tabBarOptions: {
      showLabel: false,
      showIcon: true,
      upperCaseLabel: true,
      activeTintColor: 'white',
      labelStyle: {
          fontSize: 20,
          paddingBottom: 10,
      },
      inactiveTintColor: 'white',
      activeBackgroundColor: '#185265',
      inactiveBackgroundColor: '#21393F',
  }    
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});