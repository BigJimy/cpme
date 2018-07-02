import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Button, ScrollView, Dimensions, Image, AsyncStorage } from 'react-native';
import HTML from 'react-native-render-html';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

export default class ItemEvent extends React.Component {

		state = {
					modalVisible: false,
          firstName: '',
          lastName: '',
          enterprise: '',
          email: '',
          phoneNumber: '',
				  notification: false,
					authentified: false
    }
	
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	
	isAuthentified = async () => {
		try {
			let user = await AsyncStorage.getItem('user');
			let parsed = JSON.parse(user);
			this.setState({
				firstName: parsed.firstName,
				lastName: parsed.lastName,
				enterprise: parsed.enterprise,
				email: parsed.email,
				phoneNumber: parsed.phoneNumber
			})

			if(this.state.firstName && this.state.lastName && this.state.enterprise && this.state.email && this.state.phoneNumber) {
				this.setState({authentified: true})
			}	
			else {
				this.setState({authentified: false})
			}
		}
		catch(error) {
			console.log("Error saving data" + error)
		}
	}
	
	participate = () => {
       firstname = this.state.firstName;
       lastname = this.state.lastName;
       entreprise = this.state.enterprise;
       email = this.state.email;
       phone = this.state.phoneNumber;
       idEvent = this.props.cle;
       axios.post('http://cpme.codeursyonnais.fr/wordpress/wp-json/addAttendees/v1', {
           "firstname" : firstname,
           "lastname" : lastname,
           "entreprise" : entreprise,
           "email" : email,
           "phone" : phone,
           "idEvent" : idEvent
       })
       .then((response) => {
           console.log(response.data.status)
       })                
    }
	
 render() {
	 
	let buttonParticipate = '';

	if(this.state.authentified === true) {
		buttonParticipate = (
			<TouchableOpacity
					style={styles.buttonParticipeStyle}
					onPress={() => {
					this.setModalVisible(!this.state.modalVisible);
					this.participate();                         
			}}>
					<Text style={styles.buttonParticipeText} >
							JE PARTICIPE
					</Text>
			</TouchableOpacity>			
		)
	}
	else {
		buttonParticipate = (
			<Text>
				Vous souhaitez vous inscrire ? Merci de remplir tous les champs du formulaire dans les paramètres de l'application.
			</Text>
		)
	}
	 
 return (
	 <View style={styles.itemContainer} >
			<Modal
				animationType="slide"
				transparent={false}
				visible={this.state.modalVisible}
				onRequestClose={() => {this.setModalVisible(false)}}
			>
				<ScrollView>
					<View style={{margin: 5, padding: 10}}>
						<View>
							<Text style={styles.modalTitleContent} >{this.props.title}</Text>
							<Feather 
									style={styles.iconDate}
									name="clock" size={12} 
									color="#294147"
							/> 
							<Text style={styles.modalDateContent} >
									Publié le {this.props.date.slice(0,10).split("-").reverse().join("/")}
							</Text>
							<HTML style={styles.textContent} html={this.props.content} imageMaxWidth={Dimensions.get('window').width} />
							<Text  >Lieu</Text>
							<Text  >{this.props.lieu_nom}</Text>
							<Text  >{this.props.lieu_address}</Text>
							<Text  >{this.props.lieu_zip} {this.props.lieu_city}</Text>
							<Text  >{this.props.lieu_phone}</Text>
							<Text  >{this.props.lieu_web}</Text>
							<Text  >Date</Text>
							<Text  >{this.props.date_debut} - {this.props.date_fin}</Text>

							<TouchableOpacity
									style={styles.closeButtonStyle}
									onPress={() => {
											this.setModalVisible(!this.state.modalVisible);
									}}>
									<Feather 
											style={styles.icon}
											name="x-circle" size={32} 
											color="#294147"
									/> 
							</TouchableOpacity>                                
						</View>
						<View style={styles.buttonParticipeContainer}>
							{ buttonParticipate }
						</View> 
					</View>
				</ScrollView>
			</Modal>

			<View style={styles.categoryContainer} >
					<Text style={styles.categoryName} >{this.props.type}</Text>
			</View>
			<View style={styles.item} >
					<Text style={styles.dateContent} >Publié le {this.props.date.slice(0,10).split("-").reverse().join("/")}</Text>
					<Text style={styles.titleContent} >{this.props.title}</Text>
					<Text  >Lieu</Text>
					<Text  >{this.props.lieu_nom}</Text>
					<Text  >{this.props.lieu_address}</Text>
					<Text  >{this.props.lieu_zip} {this.props.lieu_city}</Text>
					<Text  >Date</Text>
					<Text  >{this.props.date_debut} - {this.props.date_fin}</Text>
					<Image
							style={{height: 150}}
							source={{uri: this.props.image}}
							resizeMode="center"
					 />
			 </View>
			 <View style={styles.buttonShowMoreContainer}>
					 <TouchableOpacity 
							 style={styles.buttonStyle}
							 onPress={() => {
									this.setModalVisible(true)
									this.isAuthentified()
								}}>
							 <Text style={styles.buttonText}>Voir +</Text>
					 </TouchableOpacity>
			 </View> 
	 </View>
   );
	}
}

const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
		paddingBottom: 2,
  },
  item: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    overflow: 'visible',
  },
  textContent: {
		margin: 10,
  },
  titleContent: {
    fontWeight: 'bold',
		padding: 5,
		textAlign: 'center',
		paddingBottom: 20,
		paddingTop: 10,
  },
  dateContent: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
		paddingTop: 5,
  },
	modalTitleContent: {
    fontSize: 18,
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontWeight: 'bold',
		padding: 5,
		paddingTop: 40
  },
  modalDateContent: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  categoryContainer: {
		zIndex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		padding: 3,
		alignItems: 'center',
  },
  categoryName: {
    textAlign: 'center', 
    color: 'white',
    fontSize: 18,
    backgroundColor: '#b31d27',
		padding: 5,
		paddingLeft: 20,
		paddingRight: 20,
  },
	buttonShowMoreContainer: {
		zIndex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		padding: 3,
		alignItems: 'center',
		justifyContent: 'flex-end',	
	},
  buttonStyle: {
    backgroundColor: '#1B5567',
		margin: 5,
  },	
	buttonParticipeContainer: {
		padding: 3,
		alignItems: 'center',
		justifyContent: 'flex-end',	
	},
  buttonParticipeStyle: {
    backgroundColor: '#b31d27',
		margin: 5,
		padding: 3,
  },  
	buttonParticipeText: {
    margin: 3,
		color: 'white'
  },
	closeButtonStyle: {
      zIndex: 1,
      position: 'absolute',
      top: 10,
			right: 10,
      padding: 3,
  },
  buttonText: {
		color: 'white',
		textAlign: 'center',
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
  },
	icon: {
			fontWeight: 'bold'
	},
	iconDate: {
			marginRight: 10,
	}
});