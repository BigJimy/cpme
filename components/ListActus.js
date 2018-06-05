import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ItemActus from './ItemActus';
import axios from 'axios';




export default class ListActus extends React.Component {
  constructor() {
    super();
    this.state = {
      post: [],
      type: ''
    }
  }
  
  componentWillMount () {
    axios.get(`http://cpme.codeursyonnais.fr/wordpress/wp-json/wp/v2/posts`)
      .then((response) => {
          this.setState({ post: response.data, type: "Actualité"})
        })
  }



  render() {
      const posts = this.state.post
      let affichage = this.state.post.map((post, index) => {
        return (
          <ItemActus title={post.title.rendered}
              content={post.content.rendered}
              extrait={post.excerpt.rendered}
              date={post.date}
              type={this.state.type}
              key={post.id}
          /> );
      });

    return (
      <View style={styles.itemsContainer}>
          {affichage}
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



// Retrouver tous les articles
// Trouver le nombre d'articles retrouvé
// POUR CHAQUE article afficher une nouvelle fois mon code et remplir les infos en fonction d'id