import { Text } from 'native-base';
import React from 'react';
import { Image, View } from 'react-native';
import santa from '../assets/images/santa.gif';
import tree from '../assets/images/tree.gif';
import { FadeInView } from '../utils/FadeInView';
import MapView from 'react-native-maps'
import { Permissions } from 'react-native-unimodules';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';



class MapViewScreen extends React.Component {

    state = {
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null,
        location: {coords: { latitude: 37.78825, longitude: -122.4324}},
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
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
      };
    
      
    render(){
        const  {text} = this.props;
        return (
        <View style={{flex:1,marginTop:30}}>
            <MapView
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    style={{ alignSelf: 'stretch', flex:1 }}
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
        </View>
        );
    }
}

export default MapViewScreen;
