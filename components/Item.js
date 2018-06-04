import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Item extends React.Component {
  render() {
    return (
        <View style={styles.itemContainer}>
           <View style={styles.categoryLabel}>
               <Text style={styles.categoryName}>Category</Text>
           </View>
           <View style={styles.item}>
               <Text style={styles.dateContent}>01/01/2018</Text>
               <Text style={styles.textContent, styles.titleContent}>Title</Text>
               <Text style={styles.textContent}>Content 1</Text> 
            </View> 
            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={() => { return false}}>
                <Text style={styles.buttonText}>Voir +</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10
  },
  item: {
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    overflow: 'visible',
  },
  categoryName: {
    textAlign: 'center', 
    color: 'white',
    fontSize: 18,
  },
  textContent: {
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  titleContent: {
    fontWeight: 'bold',
  },
  dateContent: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  categoryLabel: {
      zIndex: 1,
      position: 'absolute',
      width: 150,
      padding: 3,
      backgroundColor: '#07A9B4',
      left: '28%',
  },
  buttonStyle: {
      zIndex: 1,
      position: 'absolute',
      width: 150,
      bottom: 0,
      padding: 3,
      backgroundColor: '#07A9B4',
      left: '40%',
      width: 80,
      backgroundColor: '#1B5567',
  },
  buttonText: {
      color: 'white',
      textAlign: 'center'
  }
});
