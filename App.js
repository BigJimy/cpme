import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Header from './components/Header';
import ListActus from './components/ListActus';
import ListEvent from './components/ListEvent';
import Parameters from './components/Parameters';
import { Feather } from '@expo/vector-icons';

let authentified = false;

class HomeScreen extends React.Component {
	static navigationOptions = {
         tabBarIcon: ({tintColor}) => (
         <Feather style={styles.icon} name="settings" size={32} color="white" />
         )
     }
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
	static navigationOptions = {
         tabBarIcon: ({tintColor}) => (
         <Feather style={styles.icon} name="settings" size={32} color="white" />
         )
     }
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
	static navigationOptions = {
         tabBarIcon: ({tintColor}) => (
         <Feather style={styles.icon} name="settings" size={32} color="white" />
         )
     }
  render() {
    return (
        <ScrollView>
           <View style={styles.mainContainer}>
               <Header />
               <Parameters navigation={this.props.navigation.navigate}/>
            </View> 
        </ScrollView>
        
    );
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem('user');
    this.props.navigation.navigate('App');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
				try {
					let user = await AsyncStorage.getItem('user');
					let parsed = JSON.parse(user);
					
					if(parsed.firstName && parsed.lastName && parsed.enterprise && parsed.email && parsed.phoneNumber) {
						authentified = true;
					}	
				}
				catch(error) {
					console.log("Error saving data" + error)
				}
			
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(authentified ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#185265"/>
      </View>
    );
  }
}

const AppStack = createBottomTabNavigator({
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
  }	
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
  }    });
const AuthStack = createStackNavigator({ SignIn: ParamsScreen });

export default createSwitchNavigator({
	AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack,
},
{
	initialRouteName: 'AuthLoading',
})

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
	container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});