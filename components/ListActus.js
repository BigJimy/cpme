import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ItemActus from './ItemActus';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';




export default class ListActus extends React.Component {
  constructor() {
    super();
    this.state = {
      post: [],
      type: 'Actualité'
    }
  }
  
	componentWillMount () {
			axios.get(`http://cpme.codeursyonnais.fr/wordpress/wp-json/mycpme/v1/post`)
			 .then((response) => {
					 this.setState({ post: response.data})
				 })
	 }
	
	refresh() {
		console.log("bonjour")
			axios.get(`http://cpme.codeursyonnais.fr/wordpress/wp-json/mycpme/v1/post`)
			 .then((response) => {
					 this.setState({ post: response.data})
				 })		
	}

 	render() {
     let affichage = this.state.post.map((post, index) => {
       return (
         <ItemActus 
             title={post.post_title}
             content={post.post_content}
             extrait={post.post_excerpt}
             date={post.post_date}
             image={post.thumbnail}
             key={post.ID}
             cle={post.ID}
         /> 
			 );

     });

    return (
      <View style={styles.itemsContainer}>
           <View style={styles.categoryContainer} >
              		<MaterialCommunityIcons 
											style={styles.icon}
											name="reload" size={32} 
											color="whitesmoke"
											onPress={() => {this.refresh()}}
									/>
               <Text style={styles.categoryName} >{this.state.type}</Text>
           </View>
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
  },
	categoryContainer: {
		zIndex: 1,
		padding: 3,
		alignItems: 'center',
		width: '100%',
    backgroundColor: '#07A9B4',
  },
  categoryName: {
    textAlign: 'center', 
    color: 'white',
    fontSize: 18,
		padding: 5,
  },
	icon: {
		position: 'absolute',
		left: 5,
		top: 3
	}
});
