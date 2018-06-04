import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';


export default class Parameters extends React.Component {
    
  constructor(props) {
      super(props)
      this.state = {
          firstName: '',
          lastName: '',
          enterprise: '',
          email: '',
          phoneNumber: '',
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
	
	submitForm() {	
		let obj = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			enterprise: this.state.enterprise,
			email: this.state.email,
			phoneNumber: this.state.phoneNumber
			}
		AsyncStorage.setItem('user', JSON.stringify(obj));
	}
		
	displayData = async () => {
		try {
			let user = await AsyncStorage.getItem('user');
			let parsed = JSON.parse(user);
			alert(parsed.firstName)
		} 
		catch(error) {
			console.log("Error saving data" + error)
		}
	} 	
	
  componentWillMount() {
			let user = AsyncStorage.getItem('user');
//			let parsed = JSON.parse(user);
//    	this.setState({ firstName: parsed.firstName })
		
    	this.setState({ 
				firstName: "Prénom", 
				lastName: "Nom",
				enterprise: "Enterprise",
				email: "Email",
				phoneNumber: "Phone Number"
			})
  }	
	
render() {
	return (
      <View style={styles.parametersContainer}>
        <FormLabel>Prénom</FormLabel>
        <FormInput
            placeholder="Votre prénom"
            value={this.state.firstName}
            onChangeText={(firstName) => this.changeFirstName(firstName)}
        />   
        <FormValidationMessage>Exemple message erreur</FormValidationMessage>     
        <FormLabel>Nom</FormLabel>
        <FormInput
            placeholder="Votre nom"
            value={this.state.lastName}
            onChangeText={(lastName) => this.changeLastName(lastName)}
        />    
        <FormValidationMessage>Exemple message erreur</FormValidationMessage>      
        <FormLabel>Entreprise</FormLabel>
        <FormInput
            placeholder="Votre entreprise"
            value={this.state.enterprise}
            onChangeText={(enterprise) => this.changeEnterprise(enterprise)}
        /> 
        <FormValidationMessage>Exemple message erreur</FormValidationMessage>      
        <FormLabel>Adresse e-mail</FormLabel>
        <FormInput
            placeholder="Votre adresse e-mail"
            value={this.state.email}
            onChangeText={(email) => this.changeEmail(email)}
        /> 
        <FormValidationMessage>Exemple message erreur</FormValidationMessage>        
        <FormLabel>Numéro de téléphone</FormLabel>
        <FormInput
            placeholder="Votre numéro de téléphone"
            value={this.state.phoneNumber}
            onChangeText={(phoneNumber) => this.changePhoneNumber(phoneNumber)}
        />
        <FormValidationMessage>Exemple message erreur</FormValidationMessage>  
        
        <Button
          style={styles.parametersButton}
          raised
          onPress={this.submitForm.bind(this)}
          icon={{name: 'cached'}}
          title='METTRE A JOUR' />        
          
        <Button
          style={styles.parametersButton}
          raised
          onPress={this.displayData}
          icon={{name: 'cached'}}
          title='AFFICHAGE TEST' />
      </View>
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
      color: 'red',
      backgroundColor: 'yellow',
  }
});