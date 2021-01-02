import { MaterialIcons } from '@expo/vector-icons';
// import { changeLanguage } from '../actions/changeLanguage';
import { Formik } from 'formik';
import { Button, Input, Item, Text } from 'native-base';
import React, { useRef } from 'react';
import { Animated, Image, Text as RcText, TouchableOpacity, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
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




class Login extends React.Component {

  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    this.state = {
      startValue: new Animated.Value(0),
      ButtonStartValue: new Animated.Value(-180),
      moveLeftValue: new Animated.Value(0),
      moveRightValue: new Animated.Value(360),
      endValue: 30,
      buttonEndValue: -5,

      endMoveValue: 300,
      duration: 3000,
      isVisible: false,
      isSuccess: 0,
      isPasswordVisible: false,
      statusColor: 'yellow'
    };
  }

  componentDidMount() {
    
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
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
      navigation.navigate("Introduction");
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

  
    
  //     wrongPassword=()=>{
  //   // NewAnimated.spring(this.moveAnimation, {
  //   //   toValue: {x: -180, y: 0},
  //   // }).start();
  //   this.setState({
  //     passwordColor: 'red'
  //   })
  //   setTimeout(()=>{
  //     this.setState({
  //       passwordColor:'#3498DB'
  //     });
  //     NewAnimated.spring(this.moveAnimation, {
  //       toValue: {x: -180, y: 0},
  //     }).start();
  //     NewAnimated.spring(this.textAnimation, {
  //       toValue: {x: 20, y: 0},
  //     }).start();
  //   },5000)
  // }

  // rightPassword=()=>{
  //   this.setState({
  //     passwordColor: 'green'
  //   })
  //   this.setDataAndNavigate()
  // }

  // loginValidate = () => {
  //   NewAnimated.spring(this.moveAnimation, {
  //     toValue: {x: 0, y: 0},
  //   }).start();
  //   NewAnimated.spring(this.textAnimation, {
  //     toValue: {x: -150, y: 0},
  //   }).start();
  //   // this.wrongPassword();
  //   this.rightPassword();
  //   // this.setDataAndNavigate()
  // }

  // moveRight = () => {
  //   NewAnimated.spring(this.moveAnimation, {
  //     toValue: {x: -215, y: 0},
  //   }).start()
  // }

  //   animate (easing) {
  //     this.animatedValue.setValue(0)
  //       Animated.timing(
  //         this.animatedValue,
  //         {
  //           toValue: 1,
  //           duration: 100,
  //           easing
  //         }
  //     ).start()
  //   }

  onSubmit = (values) => {
    alert(JSON.stringify(values));
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
        const {  navigation, screenProps, deviceLocation } = this.props;
        const { t } = screenProps;
        const  { isVisible,statusColor,isSuccess } =this.state;
      // alert(callingCode);
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
             .required(t('USRNAMEWARNING')),
          password: Yup.string()
            .required(t('PWDWARNING')),
            // language: Yup.string()
            // .required(t('LanguageValidate'))
        })}
        onSubmit={(values, formikActions) => {
          setTimeout(() => {
            // console.log(JSON.stringify(values));
            // if(values.password=='Asdx#123'){
              
            //   this.getCorrectPassword(values);
            // } else 
            // {
            //   this.getWrongPassword();
            // }
            this.checkValues(values);
            // Alert.alert(JSON.stringify(values));
            //  this.onSubmit(values);
            // Important: Make sure to setSubmitting to false so our loading indicator
            // goes away.
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

            // <KeyboardAvoidingView>
            <View style={{flex:1,height:'100%'}}>
                  <NavigationEvents
                //  onWillFocus={() => {
                //      this.resetCredentials();
                //    }}
               />
               <Animated.View 
        style={{
          flex:3,
          borderBottomRightRadius:this.state.moveRightValue,
          borderBottomLeftRadius:this.state.moveLeftValue,
          backgroundColor: isSuccess == 0.5 ? FailureBackgroundColor : isSuccess ==1 ? SuccessBackgroundColor : isSuccess>1 ? 'white' :BackgroundColorConfig
        }}>
        {/* <View
          style={
            {
              flex:1,
              backgroundColor:'red',
              
          }}
        >           */}
        <FadeInView>
        {/* isSuccess == 0.5 ? FailureBackgroundColor : isSuccess ==1 ? SuccessBackgroundColor : isSuccess>1 ? 'white' :BackgroundColorConfig */}
       <Image
    source={logo}
    style={{height:150,width:150,alignSelf:'center',overflow:'hidden'}}
  />
          <Text style={{fontSize: 50, textAlign: 'center', margin: 10,fontFamily:'Winterland'}}>Share And Care</Text>
        </FadeInView>
      {/* </View> */}
      </Animated.View>
      <Animated.View style={{flex:3,
      padding:10
      ,transform: [
                {
                  translateY: this.state.startValue,
                  
                },
              ],}}>
             {isVisible && <FadeInView>
               <View>
                    <PhNumberInput 
                    // deviceLocation={deviceLocation}
                    callingCode={callingCode}
                     t={t} getPhoneValue={getPhoneValue}  />
                          {/* <Text>{props.values.phoneNo}</Text> */}
            {props.touched.phoneNo && props.errors.phoneNo ? (
              <Text 
              style={{color: 'red',
              fontSize: 10,paddingLeft:10,marginTop:-10}}
               >{props.errors.phoneNo}</Text>
            ) : null}
            </View>
            
            {/* </View> */}
            <View style={{padding:10}}>
            <Item style={[styles.inputStyle]}>
                           <MaterialIcons name='lock-outline' size={20} color="#bdbdbd" style={styles.icon} />
                           <Input 
                           keyboardType="default"
                           value = {props.values.password}
                          //  value={subject.password} 
                           placeholder={t('LoginACSPwd')} 
                           placeholderTextColor='#bdbdbd' 
                           secureTextEntry={isPasswordVisible ? false : true} 
                          //  style={{outlineWidth: 0}} 
                           onChangeText={props.handleChange('password')}
                           />
                           <TouchableOpacity onPress={()=>{
                             this.setState({
                               isPasswordVisible:!this.state.isPasswordVisible
                             })
                           }}>
                           {this.state.isPasswordVisible ? 
                           <MaterialIcons name='visibility' size={20} color="#bdbdbd" style={styles.icon} /> : 
                           <MaterialIcons name='visibility-off' size={20} color="#bdbdbd" style={styles.icon} /> 
                           }
                           </TouchableOpacity>
       {/* { Platform.OS !=='ios' ? <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={25} color="#bdbdbd" style={{ marginRight: 10 }} onPress={() => this.showPassword()}/> : <View/> } */}
                       </Item>
            {props.touched.password && props.errors.password ? (
              <Text  style={{color: 'red',
              fontSize: 10}} >{props.errors.password}</Text>
            ) : null}
            <TouchableOpacity
                    onPress={() => { setTimeout(() => { 
                      // this.forgotPassword() 
                      navigation.navigate('PinScreen');
                    }, 0) } }
                    style={{marginTop: 15}}
                    >
                       {/* <Button transparent info> */}
                           <RcText style={[styles.buttonText, {color: backgroundColor,fontSize:10}]}>{t('LoginACSFrgtPwd')}</RcText>
                       {/* </Button> */}
                   </TouchableOpacity>
            </View>
            {/* <View style={{padding:10}}>
                      <TouchableOpacity
                       onPress={() => {
                        navigation.navigate('ChangeLanguage', {fromLogin: true,selectLanguage:this.selectLanguage.bind(this)})
                      }} style={{ position: 'absolute', marginTop: Platform.OS != 'web' ? 30 : 10,padding:Platform.OS != 'web' ? 0 : 10, zIndex: 3, height: 40, width: '100%'}}></TouchableOpacity>
                    <Item style={[styles.inputStyle]}>
                      <MaterialIcons name="translate" size={20} color={"#C0C0C0"} style={styles.icon}/>
                      <Input
                          disabled
                          onChangeText={this.onchangeLangauge(props)}      
                          onBlur={props.handleBlur('language')}
                          style={styles.inputText}
                          value={props.values.language}
                          placeholder={t('Actn_sheetChange_Language')}
                          placeholderTextColor='#bdbdbd'
                          // keyboardType="default"  
                      />
                    </Item>
            {props.touched.language && props.errors.language && props.values.language=='' ? (
              <Text style={styles.error} >{props.errors.language}</Text>
            ) : null}
            </View> */}
            {/* <View style={{padding:10,marginTop:30,marginLeft:30,flexDirection:'row',justifyContent:'space-between'}}>
          
             <Button
style={{zIndex:10,position:'absolute',padding:10,height:35,borderRadius:30,marginLeft:250,backgroundColor:backgroundColor}}
             
            onPress={props.handleSubmit}
            
              >
            <Text style={{ color: 'white',fontSize:10 }}>       {t('LoginACSLogin')}        </Text>
          
            </Button>
         
           
           
            <Animated.View style={{position:'absolute',marginTop:10,width:'100%',justifyContent:'space-between',flexDirection:'row',transform: [
                {
                  translateX: this.state.ButtonStartValue,
                  
                },
              ]}}>
<Button style={{padding:10,height:35,borderRadius:30,marginLeft:-30,backgroundColor:'orange'}}>
<Text style={{fontSize:10}}>          New User ? </Text>
</Button>
<View style={{marginTop:50}}>
<Text style={{justifyContent:'center',alignSelf:'center',fontSize:10}}>OR</Text>
            
</View>
</Animated.View>
            </View> */}
            <View style={{flexDirection:'column',marginTop:10}}>
            <View style={{marginLeft:-30,marginBottom:10,width:'120%',flexDirection:'row',justifyContent:'space-between',}}>
            <Animated.View style={{transform: [
                {
                  translateX: this.state.ButtonStartValue,
                  
                },
              ]}}>
            <Button
            onPress={()=>{
              // navigation.replace('CreateAccount');
              navigation.navigate('SendNotificationScreen');
            }}
            style={{borderRadius:30,backgroundColor:'orange'}}
            >
              <Text>        New User ?</Text>
              </Button>
              </Animated.View>
            <Button
            onPress={props.handleSubmit}
            style={{borderRadius:30}}
            >
              <Text>      LOGIN                 </Text>
              </Button>
              </View>
              
              <Text style={{justifyContent:'center',textAlign:'center'}}>OR</Text>
              
            <SocialIcon
            iconSize={15}
            title={"Sign In With Google"}
            button={true}
            type={"google"}
            />
            </View>
            </FadeInView>}
            </Animated.View>
            

            </View>
            // </KeyboardAvoidingView>
        )}}
      </Formik>
                  );

    }
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

export default Login;
