import { Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';
import showToast from '../utils/toast';
import Pin from './Pin';




class ForgotPasswordScreen extends React.Component {

state = {
  pin : '',
  newPinCode: '',
}

  getPin = (value) => {
    const  {title,navigation,oldPin,newPin,submitPin} = this.props;
    const  {newPinCode}= this.state;

    this.setState({
      pin : value
    });
    if(submitPin){
     
      if(value==newPinCode){
        
        navigation.navigate('ViewAccount');  
        showToast('Pin Changed Successfully.','success',3000);
      } else {
        // alert("gg : "+value);
        // alert('hello :'+newPin);
        navigation.navigate('PinScreen',{ changePin : true,submitPin: false,newPin: true, title : 'Enter New Pin',oldPin : '123456'});  
        showToast('Pins Does not Match.','error',3000);
      }
    } else
    if(newPin){
      this.setState({
        newPinCode: value
      })
      navigation.navigate('PinScreen',{ changePin : true,submitPin: true,newPin: true, title : 'Re-Enter New Pin',oldPin : value});  

    } else {
    navigation.navigate('PinScreen',{ changePin : true,submitPin: false,newPin: true, title : 'Enter New Pin',oldPin : '123456'});  
    }
  }
    

    
      
    render(){
        const  {title,navigation,oldPin,newPin,submitPin} = this.props;
        return (
        <View style={{flex:1,backgroundColor:'transparent',height:'100%'}}>
        <Text style={{textAlign:'center',padding:50,fontSize:25,fontFamily:'RalewayBoldItalic'}}>{title}</Text>
          <Pin submitPin={submitPin} newPin={newPin} pin={oldPin} wrongPinColor={'#fc4236'} wrongPinMessage={'Wrong pin entered.'} errorMessage= {'Invalid PIN'} getPin={this.getPin} fillColor={'#148aca'} noOfInput={6}  round={false} />
        </View>);
    }
}

export default ForgotPasswordScreen;
