import React, { Component } from "react";
import { connect } from "react-redux";
import ChristmasScreen from "../components/ChristmasScreen";
import GetStarted from "../components/GetStartedScreen";
class GetStartedPage extends Component {
    state={
        deviceToken: '',
    };


    render() {
        const  { navigation} = this.props;
        return (
            <GetStarted navigation={navigation}
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


export default connect(mapStateToProps)(GetStartedPage);
