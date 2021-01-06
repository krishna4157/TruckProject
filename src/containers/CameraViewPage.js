import React, { Component } from "react";
import { connect } from "react-redux";
import CameraScreen from "../components/CameraScreen";
import ChooseAccount from "../components/ChooseAccount";
import ChristmasScreen from "../components/ChristmasScreen";
import EnterMobileNumber from "../components/EnterMobileNumber";
import GetStarted from "../components/GetStartedScreen";
import MapViewScreen from "../components/MapView";
import MapView from "../components/MapView";
class CameraViewPage extends Component {
    state={
        deviceToken: '',
    };


    render() {
        const  { navigation, screenProps} = this.props;
        return (
            <CameraScreen screenProps={screenProps} navigation={navigation}
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


export default connect(mapStateToProps)(CameraViewPage);
