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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');



class ChooseAccount extends React.Component {

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
            navigation.navigate('EnterMobileNumber');
        }, 5500);
    }




    render() {
        const { text } = this.props;
        return (

            <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 20 }}>
                <FadeInView>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 30 }}>Choose an Account</Text>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <SocialIcon
                            iconSize={15}
                            title={"Sign In With Google"}
                            button={true}
                            type={"google"}
                        />
                        <SocialIcon
                            iconSize={15}
                            title={"Sign In With Facebook"}
                            button={true}
                            type={"facebook"}
                        />
                        <SocialIcon
                            iconSize={15}
                            title={"Sign In With instagram"}
                            button={true}
                            type={"instagram"}
                        />
                    </View>
                    <View style={{ marginTop: 20, padding: 10 }}>
                        <Text>
                            By Clicking on a social option, you may recieve an SMS for verification. Message and datarated may apply.
                          </Text>
                    </View>
                </FadeInView>
            </View>

        );
    }
}

export default ChooseAccount;
