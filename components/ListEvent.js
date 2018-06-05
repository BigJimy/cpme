import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import ItemEvent from './ItemEvent';
import axios from 'axios';




export default class ListEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      post: [],
      type: '',
			isLoading: false
    }
  }
  
  componentWillMount () {
		this.setState({ isLoading: true })
    axios.get(`http://cpme.codeursyonnais.fr/wordpress/wp-json/ee/v4.8.29/events`)
      .then((response) => {
          this.setState({ 
						post: response.data, 
						type: "Evénement",
						isLoading: false
					})
        })
  }

    _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
    }
		}

  render() {
        let affichage = this.state.post.map((post, index) => {
          return (
            <ItemEvent title={post.EVT_name}
                content={post.EVT_desc.rendered}
                date={post.EVT_created}
                image={post.featured_image_url}
                type={this.state.type}
                key={post.EVT_ID}
            /> );
        });


    return (
      <View style={styles.itemsContainer}>
          {affichage}
          {this._displayLoading()}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  itemsContainer: {
    flex: 10,
    backgroundColor: '#F2F2F2',
    width: '100%',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }

});



// Retrouver tous les articles
// Trouver le nombre d'articles retrouvé
// POUR CHAQUE article afficher une nouvelle fois mon code et remplir les infos en fonction d'id