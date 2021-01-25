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
import { StatusBar } from 'react-native';
import { Entypo, Feather, Foundation, MaterialCommunityIcons, MaterialIcons,Ionicons } from '@expo/vector-icons';
import logo from '../assets/images/driveFront.gif';
import air from '../assets/images/wind2.gif';

import marker from '../assets/images/marker.gif';
import topViewTruck from '../assets/images/topViewTruck.png';
import loader from '../assets/images/loader5.gif';

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
    markedLocation : '',
    loading: true,
    showDirections : false
  };

  componentDidMount() {
    this.setState({
      loading: true
    })
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
      ('Please turn on location services.');
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({ locationResult: JSON.stringify(location) });
    setTimeout(() => {
      this.getReverseGeocoding(location.coords.latitude,location.coords.longitude,"presentLocation");
    }, 1000);
    // Center the map on the location we just fetched.
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: latitudeDelta1, longitudeDelta: longitudeDelta1 } });
  this.setState({
    loading: false
  })
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
    // alert(`${s.latitude},${s.longitude}:${this.state.markedCoordinates.latitude},${this.state.markedCoordinates.longitude}`);
         try {
             let resp = await fetch(`https://api.tomtom.com/routing/1/calculateRoute/${s.latitude},${s.longitude}:${this.state.markedCoordinates.latitude},${this.state.markedCoordinates.longitude}/json?key=I6ZQpMS93FxiP6lxrwWzxDK2SfS3OVGN`);
             let respJson = await resp.json();
            //  alert(JSON.stringify(respJson));
             let lengthInMeters = respJson.routes[0].lengthInMeters;
             let timeInSeconds = respJson.routes[0].travelTimeInSeconds;

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
             setTimeout(() => {
                this.getReverseGeocoding(this.state.markedCoordinates.latitude,this.state.markedCoordinates.longitude,"markedLocation");
             }, 2000);
             return coords;
         } catch(error) {
           console.log(error)
             this.setState({x: "error"})
             return error
         }


  }

  getReverseGeocoding = async(latitude,longitude,type) => {
    let resp = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${latitude}%2C${longitude}.json?key=I6ZQpMS93FxiP6lxrwWzxDK2SfS3OVGN`);
    let respJson = await resp.json();
    let state = respJson.addresses[0].address.countrySubdivision;
    let district = respJson.addresses[0].address.countrySecondarySubdivision;
    let locality = respJson.addresses[0].address.municipality;
    let postalCode = respJson.addresses[0].address.postalCode;
    let country = respJson.addresses[0].address.country;
    let reverseGeoCodeAddress = `${locality}, ${district}, ${postalCode}, ${state}, ${country}`;
    // alert(reverseGeoCodeAddress);
    if(type=="markedLocation") {    
      this.setState({
        markedLocation : reverseGeoCodeAddress
      })
    } else if(type=="presentLocation") {
      this.setState({
        locationResult : reverseGeoCodeAddress
      })
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
        <StatusBar/>
        {this.state.loading && <View style={{flex:1,position:'absolute',zIndex:1,height:SCREEN_HEIGHT,width:SCREEN_WIDTH,alignItems:'center',justifyContent:'center'}}>
                <Image source={loader} style={{resizeMode:'contain',height:'10%'}}/>
                </View>}
        {/* <View style={{width:SCREEN_WIDTH,backgroundColor:'black',padding:5,marginLeft:5,paddingBottom:10,flexDirection:'row'}}>
        <Ionicons  
                        style={{ paddingLeft: 10,alignSelf:'center' }}  
                        onPress={() => navigation.openDrawer()}  
                        name="md-menu"  
                        size={30}  
                   />
                   <View style={{alignSelf:'center',width:'80%',flexDirection:'row',marginLeft:SCREEN_WIDTH/5}}>
                     <Text style={{alignSelf:'center'}}>Truck Project  </Text>
                     <Image
                      source={logo}
                      style={{height:40,resizeMode:'contain',width:80}}
                    />
                     </View>
          </View> */}
          <View>
        {/* <ImageHeader navigation={navigation} /> */}
        </View>
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
            {/* {this.state.mapRegion!=null && <Marker
            key={'2'}
            coordinate={this.state.mapRegion}
            title={'Marked point'}
            // description={`longitude : ${this.state.mapRegion.longitude} lattitude : ${this.state.mapRegion.latitude} `}
          >
            <Image
                      source={topViewTruck}
                      style={{height:40,resizeMode:'contain',width:80,transform: [
                        {
                          rotate:'95deg',
                          
                        },
                      ]}}
                    />
            </Marker>} */}


  {this.state.markedCoordinates!='' &&
          <Marker
            key={'2'}
            coordinate={this.state.markedCoordinates}
            title={'Marked point'}
            description={`longitude : ${this.state.markedCoordinates.longitude} lattitude : ${this.state.markedCoordinates.latitude} `}
          >
             <Image
                      source={marker}
                      style={{height:40,resizeMode:'contain',width:80}}
                    />
            </Marker>
           }
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
          lineJoin='miter'
          strokeWidth={5}
          lineCap={'round'}
          strokeColor="green"
  />)
        }
  })}
        </MapView>
        <View style={{padding:5,marginLeft:5,position:'absolute',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end',borderRadius:25,marginTop:0}}>
          <View style={{width:SCREEN_WIDTH-10,borderRadius:50,justifyContent:'center'}}>
          <View style={{flex:1,backgroundColor:'black',padding:0,paddingBottom:10,flexDirection:'row',borderRadius:25}}>
        <View style={{flex:1}}>
        <Ionicons  
                        style={{ paddingLeft: 5,paddingTop:10,alignSelf:'center',alignItems:'center',alignContent:'center' }}  
                        onPress={() => navigation.openDrawer()}  
                        name="md-menu"  
                        size={30}  
                   />
                   </View>
                   <View style={{flex:5,alignSelf:'center',flexDirection:'row',marginLeft:SCREEN_WIDTH/5}}>
                   <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',alignSelf:'center'}}>35 <Text>m/hr</Text></Text>
                     <Image
                      source={air}
                      style={{height:40,resizeMode:'contain',width:40,marginTop:5}}
                    />
                     <Image
                      source={logo}
                      style={{height:40,resizeMode:'contain',width:80,marginTop:5}}
                    />
                     </View>
                     <View style={{flex:1}}>
                     <Text style={{color:'green',alignSelf:'center',fontSize:35}}>●</Text>
                     </View>
                     
          </View>
          </View>
          </View>
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
                  value={JSON.stringify(this.state.markedLocation)}
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
              <View>
              <Button style={{alignSelf:'center',borderRadius:20,backgroundColor:'green'}} onPress={()=>{
                  this.showDirections();
                }}>
                  <Text>Get directions</Text>
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
