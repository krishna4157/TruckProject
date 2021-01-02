import React from 'react';
import { Image, View, Text } from 'react-native';
import santa from '../assets/images/santa.gif';
import tree from '../assets/images/tree.gif';
import { FadeInView } from '../utils/FadeInView';
import logo from '../assets/images/butterfly.gif';
import { Dimensions } from 'react-native';
import { Button } from 'native-base';
import { MaterialIcons,Entypo, AntDesign, MaterialCommunityIcons,Ionicons, FontAwesome } from '@expo/vector-icons';

const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');



class GetStarted extends React.Component {

  getPin = (value) => {
    this.setState({
      pin : value
    });
    alert(this.state.pin);
  }


  componentDidMount = async () => {
    const  {navigation} = this.props;
      // this.animation.play();
      // Or set a specific startFrame and endFrame with:
    setTimeout(()=>{
      navigation.navigate('');
     },5500);
  }
    

    
      
    render(){
        const  {text, navigation} = this.props;
        return (
       
            <View style={{flex:1,backgroundColor:'#286ef0'}}>
              <View style={{flex:6,marginTop:'30%'}}>
              <FadeInView>
                  <Text style={{textAlign:'center',fontSize:25,color:'white'}}>
                      WELCOME TO TRUCK PROJECT
                      </Text>
              <Image
    source={logo}
    style={{height:SCREEN_HEIGHT/1.5,width:'100%',alignSelf:'center',overflow:'hidden'}}
  />
              </FadeInView>
             
              </View>
              <View style={{padding:15,marginBottom:10}}>
              <Button onPress={()=>{
                  navigation.navigate('EnterMobileNumber');
              }} style={{backgroundColor:'black',flexDirection:'row'}} full >
                  <Text style={{color:'white',marginRight:'20%',paddingLeft:'25%',fontSize:20}}>GET STARTED</Text>
                  <AntDesign style={{color:'white',alignContent:'flex-end',fontSize:30}} name={'arrowright'} />
                  </Button>
                  </View>
            </View>

      );
    }
}

export default GetStarted;
