import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';

const ItemActus = (props) => {
    alterChildren: (node) => {
      let { children, name } = pnode;
      if (name === "p" && children) {
        return children.slice(0, 100)
      }
    }

    return (
        <View style={styles.itemContainer} >
           <View style={styles.categoryLabel} >
               <Text style={styles.categoryName} >{props.type}</Text>
           </View>
           <View style={styles.item} >
               <Text style={styles.dateContent} >{props.date}</Text>
               <Text style={styles.titleContent} >{props.title}</Text>
               <HTML html={props.content} imageMaxWidth={Dimensions.get('window').width} />
               <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={() => { return false}}>
                    <Text style={styles.buttonText}>Voir +</Text>
                </TouchableOpacity>
            </View> 
        </View>
    );
  }


export default ItemActus;

const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
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
