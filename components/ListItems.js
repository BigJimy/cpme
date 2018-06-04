import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Item from './Item';

export default class ListItems extends React.Component {
  render() {
    return (
      <View style={styles.itemsContainer}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 10,
    backgroundColor: '#F2F2F2',
    width: '100%',
  }
});
