import React, { Component } from "react";
import { connect } from "react-redux";
import ChooseAccount from "../components/ChooseAccount";
import ChristmasScreen from "../components/ChristmasScreen";
import GetStarted from "../components/GetStartedScreen";
class ChooseAccountPage extends Component {
    state={
        deviceToken: '',
    };


    render() {
        const  { navigation} = this.props;
        return (
            <ChooseAccount navigation={navigation}
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


export default connect(mapStateToProps)(ChooseAccountPage);
