import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default class Header extends React.Component {
	state = {
		modalVisible: false,
	};
	
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
  render() {
    return (
         <View style={styles.headerContainer}>
           <Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {this.setModalVisible(false)}}
						>
						<ScrollView>
							<View style={{margin: 5, padding: 10}}>
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
								<View style={styles.aboutContainer}>
									<Text style={styles.headerModalTitle}>A propos</Text>
									<Text style={styles.headerModalText}>Application Mobile destinée aux entreprises affiliées à la CPME 85, afin de faciliter l'échange et l'accompagnement.</Text>
									
									<Text style={styles.headerModalTitle}>Contact</Text>
									<Text style={styles.headerModalText}>
									<Feather 
											style={styles.icon}
											name="map-pin" size={12} 
											color="#294147"
									/> 5 rue Jacques Cartier, 85 000 La Roche-sur-Yon</Text>
									<Text style={styles.headerModalText}>
									<Feather 
											style={styles.icon}
											name="phone-call" size={12} 
											color="#294147"
									/> 02 51 62 63 12</Text>
									<Text style={styles.headerModalText}>
									<Feather 
											style={styles.icon}
											name="mail" size={12} 
											color="#294147"
									/> accueil@cpme85.fr</Text>
									
									<Text style={styles.headerModalTitle}>Coordination CPME Vendée</Text>
									
									<Text style={styles.headerModalText}><Text style={{color: '#b31d27'}}>- Mohammed Abdouni, </Text> Secrétaire Général de la CPME Vendée</Text>
									<Text style={styles.headerModalText}><Text style={{color: '#b31d27'}}>- Damien Brochard, </Text> Dirigeant associé chez Ozérim</Text>
									
									<Text style={styles.headerModalTitle}>Équipe de développement Arinfo</Text>
									
									<Text style={styles.headerModalText}><Text style={{color: '#b31d27'}}>- Thomas Didier </Text>(spécialité Wordpress - PHP)</Text>
									<Text style={styles.headerModalText}><Text style={{color: '#b31d27'}}>- Nicolas Le Mellec </Text>(spécialité Wordpress - PHP)</Text>
									<Text style={styles.headerModalText}><Text style={{color: '#b31d27'}}>- Camille Bonenfant </Text>(spécialité Wordpress - PHP)</Text>									
									<Text style={styles.headerModalText}><Text style={{color: '#b31d27'}}>- Jimy Bigaud </Text>(spécialité Mobile - React Native)</Text>	
									<Text style={styles.headerModalText}><Text style={{color: '#b31d27'}}>- Aymeric Ragazzi </Text>(spécialité Mobile - React Native)</Text>	
									<Text style={styles.headerModalText}><Text style={{color: '#b31d27'}}>- Julien Richard </Text>(Chef de Projet - React Native)</Text>											
								</View>
							</View>
						</ScrollView>
					</Modal>

            <Image
              style={{width: 200, height: 50}}
              source={require('./logo.png')}
              resizeMode="center"
            />
            <TouchableHighlight onPress={() => {this.setModalVisible(true)}}>
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
	},
	closeButtonStyle: {
			zIndex: 1,
      position: 'absolute',
      top: 10,
			right: 10,
      padding: 3,
  },
	aboutContainer: {
		paddingTop: 30,
	},
  headerModalTitle: {
    color:"#1B5567",
    paddingBottom: "2%",
		paddingTop: 15,
		fontWeight: 'bold',
		fontSize: 18
  }
});
