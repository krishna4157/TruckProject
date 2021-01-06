


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
import AsyncStorage from '@react-native-async-storage/async-storage';

class HeaderComponent extends React.Component {

state = {
  pin : '',
  uri : ''
}

componentDidMount =  async () => {
  const imageUri = await AsyncStorage.getItem('imageUri');
  .then(()=>{
    this.setState({
      uri : imageUri
    })
  });
}

  getPin = (value) => {
    this.setState({
      pin : value
    });
    alert(this.state.pin);
  }
    

    
      
    render(){
        const  {title,navigation} = this.props;
        const {uri } = this.state;
        var array = [UserImage,UserImage1];
        const image = uri!='' ? uri : UserImage1;
        var randomNumber = Math.floor(Math.random() * Math.floor(array.length));
        return (
      <View style={{padding:10,paddingBottom:-20,borderBottomWidth:2,borderColor:'#20a7db',width:'100%',justifyContent:'space-between',flexDirection:'row'}}>
<Text style={{ textAlign: 'center', padding: 10,paddingTop:20, fontSize: 30, fontFamily: 'RalewayBold' }}>Krishna</Text>
<TouchableOpacity activeOpacity={1} onPress={()=> navigation.navigate('ViewImage')} style={{marginTop:10,padding:10,position:'absolute',marginLeft:'70%'}} >
<View>
<Image style={{height:60,zIndex:-10,width:60,borderRadius:60,alignSelf:'flex-end',borderWidth:5,borderColor:'#20a7db',padding:50,alignContent:'flex-end',alignItems:'flex-end'}} source={image} />
</View>
</TouchableOpacity>
</View>);
    }
}

export default HeaderComponent;
