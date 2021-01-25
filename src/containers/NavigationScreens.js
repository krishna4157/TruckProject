// import { createMaterialBottomTabNavigator as createBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';
import { Entypo, Feather, Foundation, MaterialCommunityIcons, MaterialIcons,Ionicons,FontAwesome } from '@expo/vector-icons';
import { createBrowserApp } from '@react-navigation/web';
import React from 'react';
import { Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator as createBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
// import phoneData from '../components/phoneData';
// import PhoneDataPage from './phoneDataPage';
import appConstants from '../constants/appConstants';
import InitialScreen from '../containers/initialScreen';
import Login from '../containers/loginPage';
import AccountDetailsPage from './AccountDetailsPage';
import ChooseAccountPage from './ChooseAccountPage';
import ChristmasPage from './ChristmasPage';
import CreateAccount from './createAccountPage';
import EditProfilePage from './EditProfilePage';
import EnterMobileNumberPage from './EnterMobileNumberPage';
import GetStartedPage from './GetStartedPage';
import Introduction from './IntroductionPages';
import MapViewPage from './MapViewPage';
import PinScreen from './PinPage';
import SendNotificationPage from './SendNotificationPage';
import ViewAccountPage from './ViewAccountPage';
import ViewImagePage from './ViewImagePage';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import CameraViewPage from './CameraViewPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import AboutPage from './AboutPage';
import CovidPage from './CovidPage';
import YourRidesPage from './YourRidesPage';
import DriveBookingsPage from './DriveBookingsPage';
import PaymentsPage from './PaymentsPage';
import OlaMoneyPage from './OlaMoneyPage';
import ReferAndEarnPage from './ReferAndEarnPage';
import SupportPage from './SupportPage';
import { Image, Text, View } from 'native-base';
import UserImage1 from '../assets/images/seatBelt.png';
import ImageHeader from '../components/Header';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';






const isWeb = Platform.OS === 'web';
let app;
app = {} || app;
export const backgroundColor = '#0d47a1'
const tintColor = '#eceff1'

const UserAccountStack = createStackNavigator({
    AccountDetails: AccountDetailsPage,
    CreateAccount : CreateAccount,
    Introduction : Introduction,
    CameraScreen: CameraViewPage,
    PinScreen : PinScreen,
    SendNotificationScreen : SendNotificationPage,
    ViewAccount : ViewAccountPage,
    ViewImage : {
        screen : ViewImagePage,
        // navigationOptions:()=>({
          
        //     tabBarVisible:app.visible,
        //     title:'Info',
            
        //   })
    },
    AboutScreen : AboutPage,
    EditProfile : EditProfilePage
    // ChangeLanguage: ChangeLanguage,
    // ChangeTimeZone: ChangeTimeZone,
    // SubjectTimeZone: SubjectTimeZone,
    // PinSetup: PinSetup,
    // PinChange: PinChange,
    // UserValidation,
    // ResetPassword,
    // OtpVerification,
},{ 
    initialRouteName: 'ViewAccount',  
    headerMode: 'none',
});



const UserStack = createBottomTabNavigator({
    CreateAccount : CreateAccount,
    Introduction : Introduction,
    // PinScreen : PinScreen,
    AccountDetails :  {
        screen: UserAccountStack,
        navigationOptions:()=>({
          
            tabBarVisible:app.visible,
            title:'Info',
            
          })
    },
},{
    defaultNavigationOptions: ({ navigation }) => ({

        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            if (routeName === 'CreateAccount') {
                return focused ? <Foundation name="home" size={24} color={tintColor} /> : <Feather name="home" size={24} color={tintColor} />;
            } else if (routeName === 'Introduction') {
                return focused ? <MaterialCommunityIcons name="book-open-page-variant" size={24} color={tintColor} /> : <Entypo name="book" size={24} color={tintColor} />;
            } else if (routeName === 'AccountDetails') {
                return focused ? <MaterialIcons name="info" size={24} color={tintColor} /> : <MaterialIcons name="info-outline" size={24} color={tintColor} />;
            }
        },
        tabBarVisible: app.visible
    }),
    // shifting: true,
    order: ['CreateAccount', 'Introduction','AccountDetails'],
    initialRouteName: 'CreateAccount',
    // tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    activeTintColor: backgroundColor,
    inactiveTintColor: '#90a4ae',
    barStyle: { backgroundColor: '#fff', borderTopWidth: 0, },
    animationEnabled: true,
})

const MapViewPageStack = createStackNavigator(  
    {  
        MapView: MapViewPage,
        ViewAccount: UserAccountStack  
    },  
    {  
        defaultNavigationOptions: ({ navigation }) => {  
            return {  
                // headerLeft: (  
                //     <Ionicons  
                //         style={{ paddingLeft: 10 }}  
                //         onPress={() => navigation.openDrawer()}  
                //         name="md-menu"  
                //         size={30}  
                //     />  
                // ),
                // headerShown: navigation.state.routeName=="MapView" ? true : false,
                headerShown: false,

                headerTitle : null 
            };  
        }  
    }  
);  

const AppDrawerNavigator = createDrawerNavigator({

    
    MapView: {  
        screen: MapViewPageStack, 
        navigationOptions: {
            headerTitle:'',
            title: '',
            drawerLabel : null,

            // drawerLabel: (<Text style={{color:'white',fontSize:30,paddingLeft:10}}>Hi Krishna!</Text>),
          },
    },  
    CovidPage: {  
        screen: CovidPage,
        navigationOptions: {
            drawerIcon: (
                <MaterialCommunityIcons   
                name="security"  
                size={25}  
            /> 
            ),
            title : "COVID-19"
          },

    },
    YourRidesPage: {  
        screen: YourRidesPage,
        navigationOptions: {
            drawerIcon: (
                <Entypo   
                name="back-in-time"  
                size={25}  
            /> 
            ),
            title : "Your Rides"
          },

    },
    DriveBookingsPage: {  
        screen: DriveBookingsPage,
        navigationOptions: {
            drawerIcon: (
                <MaterialCommunityIcons   
                name="book-information-variant"  
                size={25}  
            /> 
            ),
            title : "Drive Bookings"
          },

    },
    PaymentsPage: {  
        screen: PaymentsPage,
        navigationOptions: {
            drawerIcon: (
                <MaterialIcons   
                name="payments"  
                size={25}  
            /> 
            ),
            title : "Payments"
          },

    },
    OlaMoneyPage: {  
        screen: OlaMoneyPage,
        navigationOptions: {
            drawerIcon: (
                <FontAwesome   
                name="money"  
                size={22}  
            /> 
            ),
            title : "Ola Money"
          },

    },
    ReferAndEarnPage: {  
        screen: ReferAndEarnPage,
        navigationOptions: {
            drawerIcon: (
                <MaterialCommunityIcons   
                name="gift"  
                size={22}  
            /> 
            ),
            title : "Refer & Earn"
          },

    },
    SupportPage: {  
        screen: SupportPage,
        navigationOptions: {
            drawerIcon: (
                <MaterialIcons   
                name="support"  
                size={22}  
            /> 
            ),
            title : "Support"
          },

    },
    AboutPage: {  
        screen: AboutPage,
        navigationOptions: {
            drawerIcon: (
                <MaterialIcons   
                name="info"  
                size={22}  
            /> 
            ),
            title : "About"
          },

    }, 
},{
    // contentOptions: ((navigation)=>
    //     <ImageHeader navigation={navigation}/>
    // )
    contentComponent: (props) => {
        // console.log("-----------------------");
        // console.log(props.navigation);

        return (
        <SafeAreaView>
            <View style={{height: 100,alignItems: 'center', justifyContent: 'center',width:'50%',flexDirection:'column'}}>
            <ImageHeader navigation={props.navigation}/>
            <View style={{marginTop:150}}>
            <Text style={{color:'white',fontSize:30,paddingLeft:10,textAlign:'left'}}>Hi Krishna!</Text>
            </View>
            </View>
          <ScrollView>
            <DrawerItems {...props} />
          </ScrollView>
        </SafeAreaView>)}
});  

// const AppSwitchNavigator = createSwitchNavigator({  
//     Dashboard: { screen: AppDrawerNavigator },  
//     Welcome: { screen: MapViewPage },  
  
// });  
  
const AuthStack = createStackNavigator({
    InitialScreen: InitialScreen,
    Login : Login,
    GetStartedPage : GetStartedPage,
    EnterMobileNumber : EnterMobileNumberPage,
    ChooseAccount : ChooseAccountPage,
    CreateAccount : CreateAccount,
    Introduction : Introduction,
    PinScreen : PinScreen,
    SendNotificationScreen : SendNotificationPage,
    Christmas : ChristmasPage,
    MapView : AppDrawerNavigator,
    User : UserStack
    // ChangeLanguage: ChangeLanguage,
    // ChangeTimeZone: ChangeTimeZone,
    // SubjectTimeZone: SubjectTimeZone,
    // PinSetup: PinSetup,
    // PinChange: PinChange,
    // UserValidation,
    // ResetPassword,
    // OtpVerification,
},
    {   
        headerMode: 'none',
        defaultNavigationOptions: ({ navigation }) => ({
            headerVisible: false,
            headerTitle:'red',
            gestureEnabled: false,
        }),
});

const AppRoutes = createSwitchNavigator({
    [`${appConstants.urlPrefix}Auth`]: AuthStack,
    // [`${appConstants.urlPrefix}RootTabs`]: RootTabs,
});


UserAccountStack.navigationOptions = ({navigation}) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    app.visible = true;
    if(routeName === 'ViewImage' || routeName == 'ViewAccount'){
        // alert(app.visible);
      app.visible = false;
    }
  }

const container = isWeb ? createBrowserApp(AppRoutes): createAppContainer(AppRoutes);   

export default container;