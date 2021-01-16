import React, { Component } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { retrieveLogin } from '../actions/login';
// import { getDeviceToken } from '../utils/pushNotification/configurePushNotification';
import { setCurrentScreen } from '../actions/storeAppStatus';
import PinScreen from "../components/PinScreen";
class NoInternetScreen extends Component {
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
            <View style={{flex:1,marginTop:30}}>
           <Text style={{fontSize:50}}>NO INTERNET</Text>
            </View>
        );
    }
}

export default NoInternetScreen;
