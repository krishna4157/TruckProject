import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'native-base';
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import UserImage1 from '../../assets/user/user1.png';
import AsyncStorage from '@react-native-community/async-storage';
import base64 from 'react-native-base64'
import CardView from './CardView';

const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

class ViewAccount extends React.Component {

    state = {
        pin: '',
        uri : '',
        openView : false
    }

    componentDidMount =  async () => {
 

        this.update();
    }

    update = async () => {
        const s = await AsyncStorage.getItem('imageUri').then((val)=>{
          return val;
        });
        this.setState({
          uri : s
      })
        const sr = await base64.decode(s);
          alert(sr);
      }

    getPin = (value) => {
        this.setState({
            pin: value
        });
        alert(this.state.pin);
    }

    hideOpenView = () => {
        this.setState({
            openView : false
        })
    }



    render() {
        const {navigation} = this.props;
        const {uri,openView} = this.state;
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent', height: '100%',width:'100%', justifyContent: 'flex-start', alignContent: 'flex-start', alignSelf: 'flex-start', alignItems: 'flex-start' }}>
                 <NavigationEvents onDidFocus={()=>{this.update()}} />
                 {openView && <TouchableOpacity onPress={()=>{
                     this.setState({
                         openView : false
                     })
                 }} style={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH,position:'absolute',backgroundColor:'transparent',zIndex:10}} />}
                <View style={{padding:10,paddingBottom:-20,borderBottomWidth:2,borderColor:'#20a7db',width:'100%',justifyContent:'space-between',flexDirection:'row'}}>
                    <Text style={{ textAlign: 'center', padding: 10,paddingTop:20, fontSize: 30, fontFamily: 'RalewayBold' }}>Krishna</Text>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={()=> navigation.navigate('ViewImage')} style={{marginTop:10,padding:10,marginRight:10,position:'absolute',marginLeft:'70%',zIndex:10}} >
                    <View>
                    <Image style={{height:60,zIndex:-10,width:60,borderRadius:60,alignSelf:'flex-end',borderWidth:5,borderColor:'#20a7db',padding:50,alignContent:'flex-end',alignItems:'flex-end'}} source={uri!=null? {uri:uri} : UserImage1} />
                    </View>
                </TouchableOpacity>
                <ScrollView style={{width:'100%',zIndex:0}}>
                <TouchableOpacity onPress={()=>{
                    this.setState({
                        openView: true
                    })
                    // navigation.navigate('CameraScreen');
                }} style={{marginTop:80,flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                    <MaterialCommunityIcons name={'face-recognition'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Change Profile Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('EditProfile');
                }} style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                    <MaterialCommunityIcons name={'account-edit'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                    <MaterialCommunityIcons name={'help'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Help</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('PinScreen',{ changePin : true,newPin: false, title : 'Enter Old Pin',oldPin : '123456'});
                }} style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                <MaterialCommunityIcons name={'onepassword'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Change PIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                <MaterialCommunityIcons name={'information-outline'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>About</Text>
                </TouchableOpacity>
                </ScrollView>
                <CardView navigation={navigation} hideOpenView={this.hideOpenView} openView={this.state.openView} />
            </View>);
    }
}

export default ViewAccount;
