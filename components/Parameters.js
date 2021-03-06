import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, CheckBox, KeyboardAvoidingView, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';


export default class Parameters extends React.Component {
    
  constructor(props) {
      super(props)
      this.state = {
          firstName: '',
          lastName: '',
          enterprise: '',
          email: '',
          phoneNumber: '',
					checkbox: false,
					adherent: 'non-adherent',
					events: []
      }
  }
			
  changeFirstName(firstName) {
      this.setState({firstName})
  }
	
   changeLastName(lastName) {
      this.setState({lastName})
  }
	
   changeEnterprise(enterprise) {
      this.setState({enterprise})
  }
	
   changeEmail(email) {
      this.setState({email})
  }
	
   changePhoneNumber(phoneNumber) {
      this.setState({phoneNumber})
  }  
	
	changeAdherent() {
		if(!this.state.checkbox){
			this.setState({
				adherent: 'adherent', checkbox: true })
		} else {
			this.setState({
				adherent: 'non-adherent', checkbox: false})							
		}
	}
	
	submitForm() {	
		let obj = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			enterprise: this.state.enterprise,
			email: this.state.email,
			phoneNumber: this.state.phoneNumber,
			events: this.state.events,
			adherent: this.state.adherent,
			checkbox: this.state.checkbox,
			}
		AsyncStorage.setItem('user', JSON.stringify(obj));
		Alert.alert(
        'Mise à jour réussie',
        'Vos coordonnées ont été sauvegardées.'
      )
		this.props.navigation('App');
	}	
	
  componentWillMount = async () => {
		try {
			let user = await AsyncStorage.getItem('user');
			let parsed = JSON.parse(user);
			this.setState({ 
				firstName: parsed.firstName,
				lastName: parsed.lastName,
				enterprise: parsed.enterprise,
				email: parsed.email,
				phoneNumber: parsed.phoneNumber,
				events: parsed.events,
				adherent: parsed.adherent,
				checkbox: parsed.checkbox,
			})
		} 
		catch(error) {
			console.log("Error saving data" + error)
		}
  }	
	
render() {
	return (
      <KeyboardAvoidingView 
       style={styles.parametersContainer}
       behavior="padding"
       >
         
         
         
         
          <View style={styles.categoryContainer} >
							<Text style={styles.categoryName} >Profil</Text>
					</View>
      
      
      
      
       
        <FormLabel>Prénom</FormLabel>
        <FormInput
            placeholder="Votre prénom"
            value={this.state.firstName}
            onChangeText={(firstName) => this.changeFirstName(firstName)}
        />   
        <FormValidationMessage></FormValidationMessage>     
        <FormLabel>Nom</FormLabel>
        <FormInput
            placeholder="Votre nom"
            value={this.state.lastName}
            onChangeText={(lastName) => this.changeLastName(lastName)}
        />    
        <FormValidationMessage></FormValidationMessage>      
        <FormLabel>Entreprise</FormLabel>
        <FormInput
            placeholder="Votre entreprise"
            value={this.state.enterprise}
            onChangeText={(enterprise) => this.changeEnterprise(enterprise)}
        /> 
        <FormValidationMessage></FormValidationMessage>      
        <FormLabel>Adresse e-mail</FormLabel>
        <FormInput
            placeholder="Votre adresse e-mail"
            value={this.state.email}
            onChangeText={(email) => this.changeEmail(email)}
        /> 
        <FormValidationMessage></FormValidationMessage>        
        <FormLabel>Numéro de téléphone</FormLabel>
        <FormInput
            placeholder="Votre numéro de téléphone"
            value={this.state.phoneNumber}
            onChangeText={(phoneNumber) => this.changePhoneNumber(phoneNumber)}
        />
        <FormValidationMessage></FormValidationMessage>  
				<View style={{ flexDirection: 'row', marginBottom: 20}}>
						<CheckBox
								value={this.state.checkbox}
								onChange={() => this.changeAdherent()}
						/>
					 <Text style={{marginTop: 5}}>
						 Adhérent CPME
					 </Text>
        </View>
        
        <View style={styles.parametersButton} >
        	<Button
						style={styles.parametersButton}
						onPress={this.submitForm.bind(this)}
						icon={{name: 'cloud-download'}}
						title='ENREGISTRER' /> 
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  parametersContainer: {
    flex: 10,
    backgroundColor: '#F2F2F2',
    width: '100%',
  },
  parametersButton: {
		marginTop: 20,
		marginBottom: 20
  },
	categoryContainer: {
		zIndex: 1,
		padding: 3,
		alignItems: 'center',
		width: '100%',
    backgroundColor: '#21393F',
  },
  categoryName: {
    textAlign: 'center', 
    color: 'white',
    fontSize: 18,
		padding: 5,
  }
});