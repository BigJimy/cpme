import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Button, ScrollView, Dimensions, Image } from 'react-native';
import HTML from 'react-native-render-html';
import { Feather } from '@expo/vector-icons';

export default class ItemEvent extends React.Component {
	state = {
		modalVisible: false,
	};
	
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	
	render() {
    return (
        <View style={styles.itemContainer} >
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {
							console.log('Fermeture du Modal');
						}}
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
										{this.props.date}
									</Text>
									<HTML style={styles.textContent} html={this.props.content} imageMaxWidth={Dimensions.get('window').width} />


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
										<Button
												style={styles.buttonParticipeStyle}
												title="JE PARTICIPE"
												onPress={() => {console.log("Ca marche")}}>
										</Button>
								</View> 
							</View>
						</ScrollView>
					</Modal>
          
           <View style={styles.categoryContainer} >
               <Text style={styles.categoryName} >{this.props.type}</Text>
           </View>
           <View style={styles.item} >
               <Text style={styles.dateContent} >{this.props.date}</Text>
               <Text style={styles.titleContent} >{this.props.title}</Text>
               <Image
								style={{height: 150}}
								source={{uri: this.props.image}}
								resizeMode="center"
							 />
            </View>
            <View style={styles.buttonShowMoreContainer}>
            	  <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={() => {this.setModalVisible(true)}}>
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
    backgroundColor: '#1B5567',
		margin: 5,
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
