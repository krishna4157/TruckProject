import React, { Component } from "react";
import { connect } from "react-redux";
import AboutScreen from "../components/AboutScreen";
import ChristmasScreen from "../components/ChristmasScreen";
import CovidScreen from "../components/CovidScreen";
class CovidPage extends Component {
    state={
        deviceToken: '',
    };


    render() {
        const  { navigation} = this.props;
        return (
            <CovidScreen navigation={navigation}
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


export default connect(mapStateToProps)(CovidPage);
