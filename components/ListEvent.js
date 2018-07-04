import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import ItemEvent from './ItemEvent';
import axios from 'axios';

let name;
let address;
let city;
let zip;
let phone;
let url;

export default class ListEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      post: [],
      type: 'Evénements',
			isLoading: true
    }
  }
  
		componentWillMount () {
			 axios.get(`http://cpme.codeursyonnais.fr/wordpress/wp-json/ee/v4.8.29/events?include=Datetime.DTT_EVT_start,Datetime.DTT_EVT_end,Venue.VNU_address,Venue.VNU_city,Venue.VNU_zip,Venue.VNU_phone,Venue.VNU_url,Venue.VNU_name,EVT_slug,EVT_name,EVT_ID,EVT_desc,EVT_created,%20featured_image_url`)
				 .then((response) => {
						 this.setState({ post: response.data, isLoading: false})
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
				 if(post.venues[0]) {
          name = post.venues[0].VNU_name
         address = post.venues[0].VNU_address
           city = post.venues[0].VNU_city
           zip = post.venues[0].VNU_zip
         phone = post.venues[0].VNU_phone
         url = post.venues[0].VNU_url
        } else {
          name = "lieu indéfini"
          address = ""
         city = ""
           zip = ""
          phone = ""
          url = ""
        }
				 
				 return (
					 <ItemEvent title={post.EVT_name}
							 content={post.EVT_desc.rendered}
							 date={post.EVT_created}
							 image={post.featured_image_url}
							 cle={post.EVT_ID}
							 key={post.EVT_ID}
							 date_debut={post.datetimes[0].DTT_EVT_start}
							 date_fin={post.datetimes[0].DTT_EVT_end}
							 lieu_nom={name}
							 lieu_address={address}
							 lieu_city={city}
							 lieu_zip={zip}
							 lieu_phone={phone}
							 lieu_web={url}
					 /> );
			 });

    return (
      <View style={styles.itemsContainer}>
         	<View style={styles.categoryContainer} >
							<Text style={styles.categoryName} >{this.state.type}</Text>
					</View>
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
  },
	categoryContainer: {
		zIndex: 1,
		padding: 3,
		alignItems: 'center',
		width: '100%',
    backgroundColor: '#b31d27',
  },
  categoryName: {
    textAlign: 'center', 
    color: 'white',
    fontSize: 18,
		padding: 5,
  },
});