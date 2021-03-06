import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableHighlight, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import HTML from 'react-native-render-html';
import { Feather } from '@expo/vector-icons';

export default class ItemActus extends React.Component {
	state = {
		modalVisible: false
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

									<TouchableHighlight
										style={styles.closeButtonStyle}
										onPress={() => {
											this.setModalVisible(false);
										}}>
										<Feather 
											style={styles.icon}
											name="x-circle" size={32} 
											color="#294147"
										/> 
									</TouchableHighlight>
								</View>
							</View>
						</ScrollView>
					</Modal>
          
           <View style={styles.item} >
               <Text style={styles.dateContent} >Publié le {this.props.date.slice(0,10).split("-").reverse().join("/")}</Text>
               <Text style={styles.titleContent} >{this.props.title}</Text>
               <Image
									style={{height: 150}}
									source={{uri: this.props.image}}
									resizeMode="center"
							 />
               <HTML html={this.props.extrait}/>
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
  },
  dateContent: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
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
		padding: 5,
  },
	closeButtonStyle: {
      zIndex: 1,
      position: 'absolute',
      top: 0,
			right: 0,
      padding: 0,
  },
  buttonText: {
		color: 'white',
		textAlign: 'center',
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


