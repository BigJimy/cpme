import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, CheckBox } from 'react-native';
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
				  notification: false,
					adherent: false,
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
			this.setState({
				adherent: !this.state.adherent
			})  
	}
	
	submitForm() {	
		let obj = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			enterprise: this.state.enterprise,
			email: this.state.email,
			phoneNumber: this.state.phoneNumber,
			events: this.state.events,
			adherent: this.state.adherent
			}
		AsyncStorage.setItem('user', JSON.stringify(obj));
		alert('Coordonnées sauvegardées')
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
				adherent: parsed.adherent
			})
		} 
		catch(error) {
			console.log("Error saving data" + error)
		}
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
								value={this.state.adherent}
								onChange={() => this.changeAdherent()}
						/>
					 <Text style={{marginTop: 5}}>
						 Adhérent CPME
					 </Text>
        </View>
        
        <ToggleSwitch
						isOn={false}
						onColor='#07A9B4'
						offColor='gray'
						label='Activer les notifications'
						labelStyle={{color: 'black', fontWeight: '900', marginHorizontal: 50}}
						size='small'
						onToggle={ (isOn) => (
					this.setState({navigation: isOn})
				)}
				
				/////////////////////////////////////////////////////////////////
				//              REVOIR ONTOGGLE DES NOTIFICATIONS              //
				/////////////////////////////////////////////////////////////////			

				/>
        <View style={styles.parametersButton} >
        	<Button
						style={styles.parametersButton}
						onPress={this.submitForm.bind(this)}
						icon={{name: 'cloud-download'}}
						title='ENREGISTRER' /> 
        </View>
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
		marginTop: 20,
		marginBottom: 20
  }
});