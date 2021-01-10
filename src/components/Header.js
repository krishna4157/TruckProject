import React, { useRef, useEffect } from 'react';
import { View, Keyboard, Image,TextInput, Text as RcText, Dimensions, StatusBar, Platform, TouchableOpacity, ActivityIndicator,Animated, KeyboardAvoidingView } from 'react-native';
import { Input, Item, Button,Text, Icon, Card, CardItem, Body } from 'native-base';
import { createForm } from 'rc-form';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomPicker } from 'react-native-custom-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PhoneNumberInput from './PhoneNoInput';
import { SocialIcon } from 'react-native-elements';

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
// import { validateLoginDetails } from '../utils/loginUtils';
import { backgroundColor } from '../containers/NavigationScreens';
import logo from '../assets/images/butterfly.gif';
import success from '../assets/images/success.gif';
import error from '../assets/images/error.png';

import { NavigationEvents } from 'react-navigation';
// import CustomToast from './CustomToast'; 
import Constants from 'expo-constants';
import { ScrollView } from 'react-native';
// import { changeLanguage } from '../actions/changeLanguage';
import { Formik, ErrorMessage } from 'formik';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import * as Yup from 'yup';
import moment from 'moment';
import { validatePhoneNumber } from '../utils/phoneNumberValidation';
// import PhoneNoInput from './PhoneNoInput';
// import PhNumberInput from './PhNumberInput';
import axios from 'axios';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native-web';
import PhNumberInput from './PhNumberInput';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';
import showToast from '../utils/toast';
import api from '../utils/api';
import { PinInput } from 'react-native-pins';
import CodePin  from 'react-native-pin-code';
import NextTextInput from 'react-native-next-input';
import PinInputBox from './PinInputBox';
import Pin from './Pin';
import UserImage from '../../assets/user/user.png';
import UserImage1 from '../../assets/user/user1.png';
import AsyncStorage from '@react-native-community/async-storage';
import base64 from 'react-native-base64'

class ImageHeader extends React.Component {

state = {
  pin : '',
  uri : ''
}

componentDidMount =  async () => {
 

 this.update();
}


update = async () => {
  const s = await AsyncStorage.getItem('imageUri').then((val)=>{
    return val;
    
  });
  this.setState({
    uri : s
})
  const sr = await base64.decode(s);
    // alert(sr);
}

  getPin = (value) => {
    this.setState({
      pin : value
    });
  }
    

    
      
    render(){
        const  {navigation} = this.props;
        const  {uri} = this.state;
        var array = [UserImage,UserImage1];
        const image = uri!=null ? {uri:  uri} : UserImage1;
        var randomNumber = Math.floor(Math.random() * Math.floor(array.length));
        // return (
        // <View style={{flexDirection:'row',padding:0,justifyContent:'space-between',backgroundColor:'transparent',zIndex:20,height:'8%',width:'10%',borderBottomLeftRadius:50,borderBottomRightRadius:0}}>
        // {/* <Text style={{textAlign:'center',padding:10,paddingLeft:20,fontSize:25,fontFamily:'RalewayBoldItalic'}}>{title}</Text> */}
        // <TouchableOpacity onPress={()=>{
        //     this.props.navigation.navigate('ViewAccount');
        // }} style={{padding:10,backgroundColor:'transparent',}}>
        // <Image source={UserImage1} style={{borderWidth:5,borderColor:'#00b9e7',borderRadius:60,maxHeight:90,maxWidth:90}} />
        // </TouchableOpacity>
        // </View>);
        
        return (
          <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('ViewAccount');
             }} style={{position:'absolute',marginTop:0,zIndex:10,padding:10}}>
               <NavigationEvents onDidFocus={()=>{this.update()}} />
            <Image source={image} style={{borderWidth:5,borderColor:'#00b9e7',borderRadius:60,maxHeight:90,maxWidth:90,height:100,width:100}} />
          </TouchableOpacity>
        )
    }
}

export default ImageHeader;
