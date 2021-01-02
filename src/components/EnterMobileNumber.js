import React from 'react';
import { Image, View, Text } from 'react-native';
import santa from '../assets/images/santa.gif';
import tree from '../assets/images/tree.gif';
import { FadeInView } from '../utils/FadeInView';
import logo from '../assets/images/butterfly.gif';
import { Dimensions } from 'react-native';
import { Button } from 'native-base';
import { MaterialIcons, Entypo, AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SocialIcon } from 'react-native-elements';
import PhNumberInput from './PhNumberInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Flag from 'react-native-flags';
import { validatePhoneNumber } from '../utils/phoneNumberValidation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');



class EnterMobileNumber extends React.Component {

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
        navigation.navigate('MapView');
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
