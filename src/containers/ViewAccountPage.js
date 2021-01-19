import React, { Component } from "react";
// import { setupInitialHealthKit, getWeight } from '../utils/healthKit/Healthkit';
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { retrieveLogin } from '../actions/login';
// import { getDeviceToken } from '../utils/pushNotification/configurePushNotification';
import { setCurrentScreen } from '../actions/storeAppStatus';
import ViewAccount from "../components/ViewAccount";
class ViewAccountScreeen extends Component {
    state={
        deviceToken: '',
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerMode : null
        }
    }
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
        // const text = navigation.getParam("BackendData");
        return (
            
            <View style={{flex:1}}>
            {/* <HeaderComponent navigation={navigation} />  */}
            

           <ViewAccount navigation={navigation} />
           
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccountScreeen);
