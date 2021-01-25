import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View, Animated } from "react-native";
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
import { Button } from "native-base";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class YourRidesScreen extends Component {
    state={
        deviceToken: '',
        startValue: new Animated.Value(0),
        ButtonStartValue: new Animated.Value(-180),
        moveLeftValue: new Animated.Value(0),
        moveRightValue: new Animated.Value(360),
        endValue: 30,
        buttonEndValue: -5,
        newValue: '',
        height: 90,
        endMoveValue: 300,
        duration: 3000,
        isVisible: false,
        isSuccess: 0,
        isPasswordVisible: false,
        statusColor: 'yellow'   
    };

    componentDidMount() {
        Animated.timing(this.state.ButtonStartValue, {
            toValue: this.state.buttonEndValue,
            duration: this.state.duration,
            useNativeDriver: false,
        }).start();
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
const {navigation} = this.props;
        return (
            <View style={{flex:1,marginTop:30}}>
                <View 
        style={{
        }}>
          <Button style={{borderTopRightRadius:30,borderBottomRightRadius:30,paddingRight:20,backgroundColor:'#c90400'}} onPress={()=>{
                   navigation.goBack();
               }}>
                   <Text>     Ride screen        </Text>
                   </Button>
          </View>
          <View style={{padding:20}}>
           <Text style={{fontSize:50}}>Every ride,fully protected</Text>
            <Text>your safety is our firsdt priority. At truck project,we're making sure that you ride with the utmost levels ofhygiene and safety every timr you step out.</Text>
            <TouchableOpacity style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                    <MaterialIcons name={'info'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Coming soon</Text>
                </TouchableOpacity>
            </View>
            </View>

        );
    }
}

export default YourRidesScreen;
