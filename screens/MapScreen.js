import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import mapStyle from '../assets/mapStyle.json';
import global from '../global';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
    };

    state = {
        mapRegion: {
            latitude: 50.062463,
            longitude: 19.944783,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0422
        },
        locationResult: null,
    };

    componentWillMount() {
        this._getLocationAsync();
    }

    ShowKid = () => {
        this.setState({
            mapRegion: {
                latitude: global.kidLocation.latitude,
                longitude: global.kidLocation.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0422
            }
        });
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied.',
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location), location, });
        this.setState({
            mapRegion: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0422
            }
        });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={this.state.mapRegion}
                    customMapStyle={mapStyle}
                    showsUserLocation={true}
                >
                    <MapView.Marker coordinate={global.kidLocation}>
                        <Image 
                            source={require('../assets/images/baby.png')} 
                            style={styles.markerImage} />    
                    </MapView.Marker>
                </MapView>
                
                <View style={styles.button}>
                    <Button 
                        onPress={this.ShowKid}
                        title="Pokaż dziecko"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: '90%', 
        alignSelf: 'flex-end'
    },
    markerImage: {
        height: 32, 
        width: 32
    }
});
