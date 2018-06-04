
 
 function remplirForm(info){
     if (infos !== null){
       changeFirstName(firstName)
       changeLastName(lastName)
       changeEnterprise(enterprise)
       changeEmail(email)
       changePhoneNumber(phoneNumber)
     }
 }
 
 
setTimeout(function autoInjectInfoClient(){

 if (AsyncStorage.getItem('firstName').length > 0 ) {
     
   document.location.href="#"
 
 }else{
   return false;
 }
}, 1000);

//   
//  let infos = [  
//         AsyncStorage.getItem('firstName', firstName),
//         AsyncStorage.getItem('lastName', lastName),
//         AsyncStorage.getItem('enterprise', enterprise),
//         AsyncStorage.getItem('email', email),
//         AsyncStorage.getItem('phoneNumber', phoneNumber),
//  ]
//    
//  submitForm() {
//     let firstName = {this.state.firstName}
//     let lastName = {this.state.lastName}
//     let enterprise = {this.state.enterprise}
//     let email = {this.state.email}
//     let phoneNumber = {this.state.phoneNumber}
//
//     AsyncStorage.setItem('firstName', firstName)
//     AsyncStorage.setItem('lastName', lastName)
//     AsyncStorage.setItem('enterprise', enterprise)
//     AsyncStorage.setItem('email', email)
//     AsyncStorage.setItem('phoneNumber', phoneNumber)
//		 
//		 console.log(infos)
//  }; 