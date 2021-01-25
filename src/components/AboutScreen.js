import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { retrieveLogin } from '../actions/login';
// import { getDeviceToken } from '../utils/pushNotification/configurePushNotification';
import { setCurrentScreen } from '../actions/storeAppStatus';
import PinScreen from "../components/PinScreen";
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { Image } from "react-native";
import loader from '../assets/images/loader5.gif';
import { Dimensions } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class AboutScreen extends Component {
    state={
        deviceToken: '',
    };

    // componentDidMount(){
    //     const {setCurrentScreen}=this.props;

    //     setCurrentScreen("LOGIN");
    //     // if(Platform.OS === 'ios') {
    //     //     setupInitialHealthKit();
    //     //   }
    // }
    
    // async componentDidMount() {
        
    //     // try {
    //     //     const deviceToken = await getDeviceToken();
    //     //     this.setState({
    //     //         deviceToken,
    //     //     })
    //     // } catch(error) {
    //     //     console.log(error)
    //     // }
    // }

    render() {

        return (
            <View style={{flex:1,marginTop:30,padding:20}}>
           <Text style={{fontSize:50}}>Redefining mobility for Billions</Text>
            <Text>Version 1.0.0</Text>
            <TouchableOpacity style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                    <MaterialIcons name={'info'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Additional information</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                    <MaterialCommunityIcons name={'help'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Terms and Services</Text>
                </TouchableOpacity>
                <View style={{flex:1,position:'absolute',zIndex:1,height:SCREEN_HEIGHT,width:SCREEN_WIDTH,alignItems:'center',justifyContent:'center'}}>
                <Image source={loader} style={{resizeMode:'contain',height:'10%'}}/>
                </View>
            </View>

        );
    }
}

export default AboutScreen;
