import React from 'react';
import { Image, View, Text, Animated } from 'react-native';
import santa from '../assets/images/santa.gif';
import tree from '../assets/images/tree.gif';
import { FadeInView } from '../utils/FadeInView';
import logo from '../assets/images/driveFront.gif';
import road from '../assets/images/road.png';
import { Dimensions } from 'react-native';
import { Button } from 'native-base';
import { MaterialIcons, Entypo, AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SocialIcon } from 'react-native-elements';
import PhNumberInput from './PhNumberInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import logo1 from '../assets/images/lorry.png';

import Flag from 'react-native-flags';
import { validatePhoneNumber } from '../utils/phoneNumberValidation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');



class EnterMobileNumber extends React.Component {

  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    this.state = {
      startValue: new Animated.Value(- SCREEN_WIDTH + SCREEN_WIDTH / 2 ),
      ButtonStartValue: new Animated.Value(-180),
      moveLeftValue: new Animated.Value(0),
      moveRightValue: new Animated.Value(360),
      endValue: SCREEN_WIDTH+60,
      buttonEndValue: -5,
      isLoading: false,
      endMoveValue: 300,
      duration: 2000,
      isVisible: false,
      isSuccess: 0,
      isPasswordVisible: false,
      statusColor: 'yellow'
    };
  }

    getPin = (value) => {
        this.setState({
            pin: value
        });
        alert(this.state.pin);
    }


    componentDidMount = async () => {
        const { navigation } = this.props;
        // this.animation.play();
        // Or set a specific startFrame and endFrame with:
        setTimeout(() => {
            navigation.navigate('');
        }, 5500);
    }

    validatePhoneNumber = (rule, value, callback) => {
        const { screenProps: { t } } = this.props;
        const phoneNumber = parsePhoneNumberFromString (value);
        if (phoneNumber === undefined || !phoneNumber.isValid () === true) {
          callback (t('NotValidPhone'));
        } else {
          callback ();
        }
      };

      checkValues = () => {
        const  {navigation} = this.props;
        this.setState({
          isLoading : true
        })
        Animated.timing(this.state.startValue, {
          toValue: this.state.endValue,
          duration: this.state.duration,
          useNativeDriver: false,
        }).start();
        setTimeout(() => {
          navigation.navigate('MapView');  
        }, 2200);
        
      }




    render() {
        const { text,screenProps:{t},navigation } = this.props;
      return (
          <Formik
          initialValues={{ phoneNo: '',
          // language: ''
        }}
          validationSchema={Yup.object({
            phoneNo: Yup.string()
            .test("len", "Must be a valid Phone Number.", val => {
                return validatePhoneNumber(val);
               })
               .required(t('USRNAMEWARNING'))
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
            <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 20 }}>
                <FadeInView>
                    <Text style={{padding:10,fontSize:25,color:'#a8b4ae',marginTop:20}}>
                        Please enter your mobile number
                    </Text>
                    <PhNumberInput 
                    // deviceLocation={deviceLocation}
                    callingCode={'91'}
                     t={t} getPhoneValue={getPhoneValue}  />
                     {props.errors.phoneNo && props.touched.phoneNo && <Text style={{paddingLeft:10,color:'red'}}>{props.errors.phoneNo}</Text>}
                      <TouchableOpacity onPress={()=>{navigation.navigate('ChooseAccount')}} style={{marginTop:5,padding:10,flexDirection:'row'}}>
                           <Text style={{color:'#26abff',fontSize:20,fontWeight:'bold'}}>
                             Or Connect using social media
                             </Text>
                             <AntDesign style={{color:'#26abff',alignContent:'flex-end',fontSize:30,marginLeft:10}} name={'arrowright'} />

                             </TouchableOpacity>
                             <Animated.View style={{
      justifyContent:'center',marginTop:'50%'
      ,transform: [
                {
                  translateX: this.state.startValue,
                  
                },
              ],}}>
                            {/* <View style={{marginLeft:'-80%',justifyContent:'center',marginTop:'50%'}}> */}
           {this.state.isLoading ? 
                             <Image
    source={logo}
    style={{alignSelf:'center',overflow:'hidden'}}
  /> : 
  <Image
    source={logo1}
    style={{alignSelf:'center',overflow:'hidden'}}
  />}
  {/* </View> */}
  </Animated.View>
  <Image
    source={road}
    style={{alignSelf:'center',overflow:'hidden',marginTop:-30,zIndex:-10}}
  />
               </FadeInView>
               <View style={{flex:1,alignSelf:'flex-end',alignItems:'flex-end',alignContent:'flex-end',flexDirection:'row'}}>
               <View style={{marginLeft:60,paddingBottom:3}} >
               <Text style={{textAlign:'left'}}>
                        By Clicking on a social option, you may recieve an SMS for verification. Message and datarated may apply.
                    </Text>
                   </View>
               <View>
              
               <TouchableOpacity onPress={props.handleSubmit} style={{backgroundColor:'black',padding:15,borderRadius:30}} >
               <AntDesign style={{color:'white',alignContent:'flex-end',fontSize:30}} name={'arrowright'} />
                </TouchableOpacity>
                </View>
                </View>
            </View>

        );
            }}
            </Formik>);
    }
}

export default EnterMobileNumber;
