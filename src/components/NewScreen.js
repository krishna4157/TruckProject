import { MaterialIcons } from '@expo/vector-icons';
// import { changeLanguage } from '../actions/changeLanguage';
import { Formik } from 'formik';
import { Button, Input, Item, Text } from 'native-base';
import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import { Animated, Image, Text as RcText, TouchableOpacity, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import { NavigationEvents } from 'react-navigation';
import * as Yup from 'yup';
import logo from '../assets/images/butterfly.gif';
// import { validateLoginDetails } from '../utils/loginUtils';
import { backgroundColor } from '../containers/NavigationScreens';
import api from '../utils/api';
import { validatePhoneNumber } from '../utils/phoneNumberValidation';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';
import showToast from '../utils/toast';

import PhNumberInput from './PhNumberInput';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')




class NewScreen extends React.Component {

  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    this.state = {
      startValue: new Animated.Value(SCREEN_HEIGHT),
      ButtonStartValue: new Animated.Value(-180),
      moveLeftValue: new Animated.Value(0),
      alignment : new Animated.Value(0),
      moveRightValue: new Animated.Value(360),
      endValue: 30,
      buttonEndValue: -5,

      endMoveValue: 0,
      duration: 3000,
      isVisible: false,
      isSuccess: 0,
      isPasswordVisible: false,
      statusColor: 'yellow'
    };
  }

  componentDidMount() {
    const {endMoveValue} = this.state;
    Animated.timing(this.state.startValue, {
      toValue: SCREEN_HEIGHT-endMoveValue,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.ButtonStartValue, {
      toValue: this.state.buttonEndValue,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      this.setState({
        isVisible: true
      })
    }, 500);
  }


  getCorrectPassword = async(data) => {
    const {navigation}= this.props;
    try {
    this.setState({
      statusColor: 'blue'
    });
    this.StartBackgroundColorAnimation();
    // Animated.timing(this.state.moveLeftValue, {
    //   toValue: 360,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();

    
    Animated.timing(this.state.moveLeftValue, {
      toValue: 360,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(this.state.moveRightValue, {
      toValue: 360,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(this.state.moveRightValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    
      this.setState({
        isSuccess: 1
      })
    }, 5000);
    setTimeout(() => {
      showToast('Login Successfully', 'success', 3000);  
      // navigation.navigate("NextScreenWithData",{'BackendData' : data})
      // Introduction
      // navigation.navigate("Christmas");
    }, 6000);
  } catch(e){
    this.getWrongPassword()
  }

  }


  getWrongPassword = (e) => {
    this.setState({
      statusColor: 'blue'
    });
    this.setState({
      isSuccess: 0
    });
    this.StartBackgroundColorAnimation();
    // Animated.timing(this.state.moveLeftValue, {
    //   toValue: 360,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();

    
    Animated.timing(this.state.moveLeftValue, {
      toValue: 360,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(this.state.moveRightValue, {
      toValue: 360,
      duration: 500,
      useNativeDriver: false,
    }).start();


    setTimeout(() => {
      Animated.timing(this.state.moveLeftValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();

      Animated.timing(this.state.moveRightValue, {
        toValue: 360,
        duration: 500,
        useNativeDriver: false,
      }).start();
    
      this.setState({
        isSuccess: 0.5
        
      })
      showToast('Failed to login', 'danger', 3000);

    }, 5000);

    setTimeout(() => {
    
      this.setState({
        isSuccess:2
      })
    }, 10000);
    


  }

  
    
 

  onSubmit = (values) => {
    alert(JSON.stringify(values));
  }

  onClick = () => {
    Animated.timing(this.state.startValue, {
      toValue: SCREEN_HEIGHT-300,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

  bringUpActionSheet = () => {
    Animated.timing(this.state.alignment,{
        toValue: 1,
        duration: 500
    }).start();
}

hideTheActionSheet = () => {
  // Animated.timing(this.state.alignment,{
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver :  true
  // }).start();

  Animated.timing(this.state.startValue, {
    toValue: SCREEN_HEIGHT,
    duration: 400,
    useNativeDriver: false,
  }).start();
}

  gestureHandler = (e) => {
    alert('helo');
    if(e.nativeEvent.contentOffset.y > 0 ) this.bringUpActionSheet();
    else hideTheActionSheet();
}

  StartBackgroundColorAnimation = () =>
    {
        this.Animation.setValue(0);

        Animated.timing(
            this.Animation,
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: false,
            }
        ).start(() => { this.StartBackgroundColorAnimation() });
    }

  //   forgotPassword = () => {
  //     // const { navigation } = this.props;
  //     // navigation.navigate('UserValidation');
  //   //   navigation.navigate('ResetPassword');
  // }
    
  checkValues = async (values) => {
   try {
      const user  = {
        phoneNo : values.phoneNo,
        loginPassword: values.password 
      };
      // const res = await api.post("/login",user);
      const s = "HELLO";
      console.log(s);
      this.getCorrectPassword(s);
    
    } catch(e) {
      console.log(e);
      this.getWrongPassword(e);
    }
  }
    
      
    render(){
        const { image, subject, errorMessage, showPassword,language,languageSelected, callingCode, modalVisible,isPasswordVisible } = this.state;
        const {  navigation, deviceLocation } = this.props;
        const  { isVisible,statusColor,isSuccess } =this.state;
      const BackgroundColorConfig = this.Animation.interpolate(
        {
            inputRange: [ 0, 0.2, 0.4, 0.8, 1 ],
            
            outputRange: [ 'white', '#CDDC39', '#03A9F4', '#FFEB3B', 'white' ],

        });


        const SuccessBackgroundColor = this.Animation.interpolate(
          {
              inputRange: [ 0,0.5, 1 ],
              
              outputRange: [ '#009688', 'green','#009688'],
  
          });

          const FailureBackgroundColor = this.Animation.interpolate(
            {
                inputRange: [ 0,0.5, 1 ],
                
                outputRange: [ 'white', 'red', 'white',],
    
            });



      return (
        <Formik
        initialValues={{ phoneNo: '', password: '' ,
        // language: ''
      }}
        validationSchema={Yup.object({
          phoneNo: Yup.string()
          .test("len", "Must be a valid Phone Number.", val => {
              return validatePhoneNumber(val);
             })
             .required('USRNAMEWARNING'),
          password: Yup.string()
            .required('PWDWARNING'),
        })}
        onSubmit={(values, formikActions) => {
          setTimeout(() => {
            this.checkValues(values);
            formikActions.setSubmitting(false);
          }, 500);
        }}>
        {props =>{
           const {
             setFieldValue,setValues
          } = props;
          const getPhoneValue=(value,phoneNo)=>{
            setFieldValue(
                  'phoneNo',value+phoneNo)
          }
        
          return (
            <View style={{flex:1,height:'100%'}}>
                  <NavigationEvents />
                  <TouchableOpacity activeOpacity={1} onPress={()=>{this.hideTheActionSheet()}} style={{backgroundColor:'trnasparent',height:SCREEN_HEIGHT}}>
                  <Button onPress={()=>{
                    this.onClick();
                  }} style={{justifyContent:'center',alignSelf:'center',zIndex:10}}>
                    <Text>GEE</Text>
                    </Button>
                    </TouchableOpacity>
      <Animated.View elevation={5}  style={{flex:3,position:'absolute',width:SCREEN_WIDTH,height:SCREEN_HEIGHT,
      padding:10,backgroundColor:'white',borderColor:'grey',borderWidth:5,borderRadius:30,elevation:2,shadowColor:'grey'
      ,transform: [
                {
                  translateY: this.state.startValue,
                },
              ],}}>
                
           <FadeInView>
            <TouchableOpacity onPressIn={()=>{this.hideTheActionSheet()}} style={{backgroundColor:'transparent',zIndex:10,height:20,marginTop:-10,width:SCREEN_WIDTH,marginLeft:-10,position:'absolute'}} onPress={()=>{this.hideTheActionSheet()}} >
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.hideTheActionSheet()}} onPressIn={()=>{this.hideTheActionSheet()}}  style={{backgroundColor:'grey',width:60,height:10,borderRadius:30,alignSelf:'center',zIndex:-10}} ></TouchableOpacity>
      
            
            </FadeInView>
          </Animated.View>
            </View>
        )}}
      </Formik>
                  );

    }
}

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0


  React.useEffect(() => {
    
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  contentContainer: {
      paddingTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 10,
  },
  left : {
    paddingLeft:10
  },
  text: {
    fontSize: 15, lineHeight: 23, padding: 10
  },
});


export default NewScreen;
