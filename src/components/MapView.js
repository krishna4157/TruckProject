import { Card, Input, Text } from 'native-base';
import React from 'react';
import { Image, View } from 'react-native';
import santa from '../assets/images/santa.gif';
import tree from '../assets/images/tree.gif';
import { FadeInView } from '../utils/FadeInView';
import MapView from 'react-native-maps'
import { Permissions } from 'react-native-unimodules';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { Dimensions } from 'react-native';
import ImageHeader from './Header';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class MapViewScreen extends React.Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

    // Center the map on the location we just fetched.
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
  };




  render() {
    const { text,navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ImageHeader navigation={navigation} />
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={{ alignSelf: 'stretch', flex: 1 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
        >
          <Marker
            key={'1'}
            coordinate={this.state.location.coords}
            title={'title'}
            description={'marker.description'}
          />
        </MapView>
        <View style={{ backgroundColor: 'white', paddingBottom: 5,elevation:1005,shadowColor:'black' }}>
          <View style={{ flexDirection: 'column', position: 'relative', borderRadius: 30, flexDirection: 'column', width: '100%' }}>
            <View style={{ backgroundColor: '#6199f6', padding: 5 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 5, color: 'white' }}>Where to ?</Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: 'bold',fontSize:20 }}>Destination</Text>

              <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, alignItems: 'center', padding: 5, backgroundColor: 'white' }}>
                <Input
                  style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 10, marginLeft: 5 }}
                  keyboardType="default"
                  placeholder={'please enter destination'}
                  placeholderTextColor='#bdbdbd'
                  secureTextEntry={false}
                /> 
              </View>
              <Text style={{ fontWeight: 'bold',fontSize:20 }} >Current Location</Text>
              <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center', padding: 5, backgroundColor: 'white' }}>
                <Input
                  value={this.state.locationResult}
                  style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 10, marginLeft: 5 }}
                  keyboardType="default"
                  placeholder={'please enter current location'}
                  placeholderTextColor='#bdbdbd'
                  secureTextEntry={false}
                />
              </View>
            </View>
            <View />
          </View>
        </View>
      </View>
    );
  }
}

export default MapViewScreen;
