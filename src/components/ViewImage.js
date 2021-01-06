import { Text } from 'native-base';
import React from 'react';
import { Clipboard, Image, TouchableOpacity, View } from 'react-native';
import UserImage from '../../assets/user/user.png';
import UserImage1 from '../../assets/user/user1.png';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';
import showToast from '../utils/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64'
import { NavigationEvents } from 'react-navigation';


class ViewImage extends React.Component {

state = {
  pin : '',
  uri: ''
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


    
  readFromClipboard = async () => {   
    const clipboardContent = Clipboard.setString("Krishna4157");   
    this.setState({ clipboardContent }); 
    showToast('ID Copied', 'success', 2000);  

  };

    
      
    render(){
        const  {text,navigation} = this.props;
        var array = [UserImage,UserImage1];
        var randomNumber = Math.floor(Math.random() * Math.floor(array.length));
        return (
        <View style={{flex:1,justifyContent:'center',backgroundColor:'black',padding:10}}>
            <NavigationEvents onDidFocus={()=>{this.update()}} />
            <View style={{flex:3,padding:10}}>
            <Image source={{uri: this.state.uri}} style={{resizeMode:'cover',alignSelf:'center',height:'100%',width:'100%',borderRadius:30}}/>
            </View>
            <View style={{flex:3,justifyContent:'flex-end'}}>
            <Text style={{textAlign:'center',fontSize:30,padding:0,justifyContent:'flex-end'}}>ID</Text>
            <TouchableOpacity onPress={this.readFromClipboard}>
            <Text style={{textAlign:'center',fontSize:40,padding:20,justifyContent:'flex-end',color:'white'}}>Krishna4157</Text>
            </TouchableOpacity>
            </View>
        </View>);
    }
}

export default ViewImage;
