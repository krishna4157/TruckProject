import { Button, Card, Input, Text } from 'native-base';
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
import MapViewDirections from 'react-native-maps-directions';
import Polyline from '@mapbox/polyline';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
let latitudeDelta1 = 0.0042;
let longitudeDelta1 = 0.0021;
class MapViewScreen extends React.Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    markedCoordinates: '',
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
    latitudeDelta: 0.0042,
    longitudeDelta: 0.0021,
    coords : [],
    loading: true,
    showDirections : false
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange = mapRegion => {
    console.log('mapRegion');
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
     alert('Please turn on location services.');
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({ locationResult: JSON.stringify(location) });

    // Center the map on the location we just fetched.
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: latitudeDelta1, longitudeDelta: longitudeDelta1 } });
  };

  setlocation = async (event) => {
    // let resp = await fetch(`https://api.tomtom.com/routing/1/calculateRoute/52.50931,13.42936:52.50274,13.43872/json?key=I6ZQpMS93FxiP6lxrwWzxDK2SfS3OVGN`)
    
    //          let respJson = await resp.json();
    //          alert(JSON.stringify(respJson));
    //          let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    //          let coords = points.map((point, index) => {
    //              return  {
    //                  latitude : point[0],
    //                  longitude : point[1]
    //              }
    //          })
    //          this.setState({coords: coords})
    //          this.setState({x: "true"})
             
    const s = {
      latitude : event.nativeEvent.coordinate.latitude,
      longitude : event.nativeEvent.coordinate.longitude,
      latitudeDelta: latitudeDelta1,
      longitudeDelta: longitudeDelta1, 
    }
    this.setState({markedCoordinates : s}).then(()=>this.getDirections());
    console.log('sssss');
    console.log(s);
    // this.getDirections()

  }

  getDirections = async() => {
    // let s = startLoc;
    const s = this.state.mapRegion;
    alert(`${s.latitude},${s.longitude}:${this.state.markedCoordinates.latitude},${this.state.markedCoordinates.longitude}`);
         try {
             let resp = await fetch(`https://api.tomtom.com/routing/1/calculateRoute/${s.latitude},${s.longitude}:${this.state.markedCoordinates.latitude},${this.state.markedCoordinates.longitude}/json?key=I6ZQpMS93FxiP6lxrwWzxDK2SfS3OVGN`);
             let respJson = await resp.json();
            //  alert(JSON.stringify(respJson));
             let points = respJson.routes[0].legs[0].points;
             let coords = points.map((point, index) => {
                 return  {
                     latitude : point.latitude,
                     longitude : point.longitude,
                     latitudeDelta: latitudeDelta1,
                     longitudeDelta: longitudeDelta1, 
                 }
             })
             console.log("coord");
             console.log(coords);
             this.setState({coords: coords})
             this.setState({x: "true"})
             this.setState({
               loading : false
             })
             return coords;
         } catch(error) {
           console.log(error)
             this.setState({x: "error"})
             return error
         }
  }

  showDirections = () => {
    this.getDirections();
    this.setState({
      showDirections : true
    });
  }

  setRegion = (val) => {
   latitudeDelta1 = val.latitudeDelta;
   longitudeDelta1 = val.longitudeDelta; 
   console.log(val);
  }




  render() {
    const { text,navigation } = this.props;
    const origin = { latitude: 42.2678176, longitude: -71.000124 };
const destination = { latitude: 42.2929175, longitude: -71.0548235 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyD0uufPZfC4jhqAlqywniMTpr1zaqgF7RQ';
    return (
      <View style={{ flex: 1 }}>
        <ImageHeader navigation={navigation} />
        <MapView
          onPress={ (event) => this.setlocation(event) }
          onRegionChangeComplete={(val) => this.setRegion(val)}
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


  {this.state.markedCoordinates!='' &&
          <Marker
            key={'2'}
            coordinate={this.state.markedCoordinates}
            title={'Marked point'}
            description={`longitude : ${this.state.markedCoordinates.longitude} lattitude : ${this.state.markedCoordinates.latitude} `}
          />}
{/* <MapViewDirections
    origin={this.state.mapRegion}
    destination={this.state.coords[1]}
    apikey={'I6ZQpMS93FxiP6lxrwWzxDK2SfS3OVGNs'}
  /> */}
  {/* {this.state.markedCoordinates!='' && this.state.coords.map((value,index)=> {
    if(index+1<this.state.coords.length){
     return (<MapView.Polyline
     key={index}
          coordinates={[
              value,
              this.state.coords[index+1],
          ]}
          strokeWidth={3}
          strokeColor="blue"
  />)
        }
  }) } */}
  {this.state.markedCoordinates!='' && !this.state.loading && this.state.showDirections && this.state.coords.map((value,index)=> {
    
    if(this.state.coords[index+1]!=undefined){
      console.log(value);
     return (<MapView.Polyline
     key={index}
          coordinates={[
              value,
              this.state.coords[index+1],
          ]}
          strokeWidth={3}
          strokeColor="blue"
  />)
        }
  })}
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
                  value={JSON.stringify(this.state.markedCoordinates)}
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
                <Button onPress={()=>{
                  this.showDirections();
                }}>
                  <Text>HELO</Text>
                  </Button>
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
