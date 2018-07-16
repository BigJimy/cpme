import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Button, ScrollView, Dimensions, Image, AsyncStorage } from 'react-native';
import HTML from 'react-native-render-html';
import { Feather, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import Hyperlink from 'react-native-hyperlink';

export default class ItemEvent extends React.Component {

		state = {
					modalVisible: false,
          firstName: '',
          lastName: '',
          enterprise: '',
          email: '',
          phoneNumber: '',
				  notification: false,
					authentified: false,
					status: '',
					events: [],
					inscrit: false,
					storage: '',
					adherent: ''
    }
	
  componentDidMount() {
		this.isAuthentified()
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
				phoneNumber: parsed.phoneNumber,
				events: parsed.events
			})

			
			if(this.state.firstName && this.state.lastName && this.state.enterprise && this.state.email && this.state.phoneNumber) {
				this.setState({authentified: true})
			}	
			else {
				this.setState({authentified: false})
			}
			
			
			//
			if(this.state.events) {
				for(let i = 0; i  < this.state.events.length; i++) {
                if(this.state.events[i] === this.props.cle) {
                    this.setState({inscrit: true})
                }
            }			
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
			 adherent = this.state.adherent;
       axios.post('http://cpme.codeursyonnais.fr/wordpress/wp-json/addAttendees/v1', {
           "firstname" : firstname,
           "lastname" : lastname,
           "entreprise" : entreprise,
           "email" : email,
           "phone" : phone,
           "idEvent" : idEvent,
				   "adherent" : adherent
       })
       .then((response) => {
					 this.setState({status: response.data.status, inscrit: true})
       })                
    }
	
	agendaStorage = () => {
        let newEvents = (this.state.events ? this.state.events : [])
        newEvents.push(this.props.cle)

        let obj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            enterprise: this.state.enterprise,
            email: this.state.email,
						phoneNumber: this.state.phoneNumber,
						events: newEvents,
						adherent: this.state.adherent
            }
        AsyncStorage.setItem('user', JSON.stringify(obj));
       alert('Inscription enregistrée');
    }
	
	componentWillReceiveProps(nextProps) {
        if (nextProps.storage !== this.state.storage) {
          this.setState({storage: this.props.storage });
          this.isAuthentified();
        }
      }
	
 render() {
	 
	let buttonParticipate = '';

	if(this.state.authentified === true) {
			if(this.state.inscrit === false) {
				 if(this.state.status === "") {
							 buttonParticipate = (
									 <TouchableOpacity
											 style={styles.buttonParticipeStyle}
											 onPress={() => {
										 		this.agendaStorage()
												this.participate()}}>
											 <Text
													 style={styles.buttonParticipeText}
											 >
													 JE PARTICIPE
											 </Text>
									 </TouchableOpacity>
							 )
					 } else if(this.state.status === "Requete effectuée") {
							 buttonParticipate = <Text style={styles.msgValidation}>Inscription validée</Text>
					 } else if(this.state.status === "Please provide correct post details") {
							 buttonParticipate = <Text style={styles.msgValidation}>Veuillez vérifier vos paramètres utilisateurs</Text>
					 } else {
							 buttonParticipate = <Text style={styles.msgValidation}>Une erreur est survenue, veuillez contacter la CPME pour votre inscription</Text>
					 }			
			} else {
                buttonParticipate = <Text style={styles.msgValidation}>Vous êtes inscrit à cet évènement</Text>
            }
	}
	else {
		
		buttonParticipate = (
			<Text style={styles.msgValidation}>
				Pour vous inscrire, merci de remplir tous les champs du formulaire dans les paramètres de l'application.
			</Text>
		)
	}

	 let star = ""
	 if(this.state.inscrit) {
		 star = (
		 					<View>
		 						<FontAwesome 
										style={styles.icon_favorite}
										name="star" size={26} 
										color="#07A9B4"
								/>
		 					</View>
		 )
	 }
	 else {
		 star = (
		 <View></View>
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
							<Text style={styles.modalDateContent} >
								<Feather 
										style={styles.iconDate}
										name="clock" size={12} 
										color="#294147"
								/> Publié le {this.props.date.slice(0,10).split("-").reverse().join("/")}
							</Text>
							<HTML style={styles.textContent} html={this.props.content} imageMaxWidth={Dimensions.get('window').width} />
							<Text  >
								<Feather 
										style={styles.icon}
										name="map-pin" size={12} 
										color="#294147"
								/> {this.props.lieu_nom}</Text>
							<Text>{this.props.lieu_address}</Text>
							<Text>{this.props.lieu_zip} {this.props.lieu_city}</Text>
							<Text>{this.props.lieu_phone}</Text>
							<Text style={styles.date}>
								<Feather 
											style={styles.icon}
											name="calendar" size={12} 
											color="#294147"
									/> du {this.props.date_debut.slice(0,10).split("-").reverse().join("/")} à {this.props.date_debut.slice(11,16)}
							</Text>
							<Text>
								 au {this.props.date_fin.slice(0,10).split("-").reverse().join("/")}  à {this.props.date_fin.slice(11,16)}
							</Text>
							<Hyperlink linkDefault={ true }>
								<Text style={styles.siteweb}>
									<Feather 
										style={styles.icon}
										name="info" size={12} 
										color="#294147"
									/> {this.props.lieu_web}
								</Text>
							</Hyperlink>

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

			<View style={styles.item} >
				
					{star}
					
					<Text style={styles.dateContent} >Publié le {this.props.date.slice(0,10).split("-").reverse().join("/")}</Text>
					<Text style={styles.titleContent} >{this.props.title}</Text>
					<Text  >
						<Feather 
								style={styles.icon}
								name="map-pin" size={12} 
								color="#294147"
						/> {this.props.lieu_nom}
					</Text>
					<Text  >{this.props.lieu_address}</Text>
					<Text  >{this.props.lieu_zip} {this.props.lieu_city}</Text>
					<Text style={styles.date}>
						<Feather 
									style={styles.icon}
									name="calendar" size={12} 
									color="#294147"
							/> du {this.props.date_debut.slice(0,10).split("-").reverse().join("/")} à {this.props.date_debut.slice(11,16)}
					</Text>
					<Text>
						 au {this.props.date_fin.slice(0,10).split("-").reverse().join("/")}  à {this.props.date_fin.slice(11,16)}
					</Text>
					<Image
							style={{height: 150, marginTop: 20}}
							source={{uri: this.props.image}}
							resizeMode="center"
					 />
			 </View>
			 <View style={styles.buttonShowMoreContainer}>
					 <TouchableOpacity 
							 style={styles.buttonStyle}
							 onPress={() => {
									this.setModalVisible(true)
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
		fontSize: 18
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
		marginTop: 20
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
	iconFavorite: {
		fontWeight: 'bold',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 1
	},
	iconDate: {
		marginRight: 10,
	},
	msgValidation: {
		fontWeight: 'bold',
		color: '#1B5567',
		fontSize: 20,
		textAlign: 'center'
	},
	date: {
		marginTop: 4
	},
	siteweb: {
		fontWeight: 'bold',
	}
});