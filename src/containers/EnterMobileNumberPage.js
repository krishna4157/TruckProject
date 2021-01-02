import React, { Component } from "react";
import { connect } from "react-redux";
import ChooseAccount from "../components/ChooseAccount";
import ChristmasScreen from "../components/ChristmasScreen";
import EnterMobileNumber from "../components/EnterMobileNumber";
import GetStarted from "../components/GetStartedScreen";
class EnterMobileNumberPage extends Component {
    state={
        deviceToken: '',
    };


    render() {
        const  { navigation, screenProps} = this.props;
        return (
            <EnterMobileNumber screenProps={screenProps} navigation={navigation}
            />
        );
    }
}

const mapStateToProps = state => ({
      selectedLanguage: state.changeLanguage.selectedLanguage,
      loading: state.loading,
      currentScreen: state.appStatus.currentScreen,
      deviceLocation: state.deviceLocation,
});


export default connect(mapStateToProps)(EnterMobileNumberPage);
