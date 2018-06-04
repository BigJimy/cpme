import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default class Header extends React.Component {
  render() {
    return (
         <View style={styles.headerContainer}>
            <Image
              style={{width: 200, height: 50}}
              source={{uri: 'https://www.cpme85.fr/wp-content/uploads/sites/4/2018/03/logo-85.png'}}
              resizeMode="center"
            />
            <TouchableHighlight onPress={ () => (alert("Good"))}>
                <Feather 
									style={styles.icon}
									name="info" size={32} 
									color="#294147"
								/>        
            </TouchableHighlight>

          </View> 
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 22,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  icon: {
    fontWeight: 'bold'
}
});
