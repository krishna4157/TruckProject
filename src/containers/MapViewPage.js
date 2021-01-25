import { View } from "native-base";
import React, { Component } from "react";
import { BackHandler } from "react-native";
import { NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import ChooseAccount from "../components/ChooseAccount";
import ChristmasScreen from "../components/ChristmasScreen";
import EnterMobileNumber from "../components/EnterMobileNumber";
import GetStarted from "../components/GetStartedScreen";
import MapViewScreen from "../components/MapView";
import MapView from "../components/MapView";
class MapViewPage extends Component {
    state={
        deviceToken: '',
    };

    onFocus =() => {
        const {navigation} = this.props;
        // alert(JSON.stringify(navigation));
        // console.log(navigation);
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }
    
    onBlur =() => {
        // alert("on bluer");
        // BackHandler.removeEventListener('hardwareBackPress',() => this.onBackButtonPressed());
        this.backHandler.remove();
    }

    onBackButtonNotPressed = () => {
        alert('hello');
    }
    
    onBackButtonPressed =() => {
        const {navigation} = this.props;
        // const { routeName } = navigation.state.routes[navigation.state.index];
        // alert(JSON.stringify(routeName));
        return true;
    }


    render() {
        const  { navigation, screenProps} = this.props;
        return (
            <View style={{flex:1}}>
            <NavigationEvents onDidFocus={this.onFocus} on onDidBlur={this.onBlur} />
            <MapViewScreen screenProps={screenProps} navigation={navigation}
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


export default connect(mapStateToProps)(MapViewPage);
