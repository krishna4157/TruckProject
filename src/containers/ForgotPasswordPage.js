import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { retrieveLogin } from '../actions/login';
// import { getDeviceToken } from '../utils/pushNotification/configurePushNotification';
import { setCurrentScreen } from '../actions/storeAppStatus';
import ForgotPasswordScreen from "../components/ForgotPasswordScreen";
import PinScreen from "../components/PinScreen";
class ForgotPasswordPage extends Component {
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
        const { navigation, } = this.props;
        const { deviceToken } = this.state;
        const title = navigation.getParam("title") || "forgot Password";
        const changePin = navigation.getParam("ChangePin") || false;
        const oldPin = navigation.getParam("oldPin") || true;
        const newPin = navigation.getParam("newPin") || false;
        const submitPin = navigation.getParam("submitPin") || false;
        
        

        return (
            <View style={{flex:1,marginTop:30}}>
            <ForgotPasswordScreen 
                submitPin={submitPin} 
                newPin={newPin} 
                oldPin={oldPin} 
                changePin={changePin} 
                title={title} 
                navigation={navigation}
            />
            </View>
        );
    }
}



const mapStateToProps = state => ({
      selectedLanguage: state.changeLanguage.selectedLanguage,
      loading: state.loading,
      currentScreen: state.appStatus.currentScreen,
      deviceLocation: state.deviceLocation,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        retrieveLogin,
        setCurrentScreen
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
