import React from 'react';
import { StyleSheet } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import mapStyle from '../assets/mapStyle.json';

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
        location: {
            coords: {
                latitude: 50.062463,
                longitude: 19.944783
            }
        },
        kidLocation: {
            coords: {
                latitude: 50.8892567,
                longitude: 21.6640704
            }
        }
    };

    componentWillMount() {
        this._getLocationAsync();
    }

    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
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
            <MapView
                style={{ flex: 1 }}
                region={this.state.mapRegion}
                customMapStyle={mapStyle}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                onRegionChange={this._handleMapRegionChange}
            >
                <MapView.Marker
                    coordinate={this.state.location.coords}
                    image={require('../assets/images/binoculars.png')}
                />

                <MapView.Marker
                    coordinate={this.state.kidLocation.coords}
                    image={require('../assets/images/baby.png')}
                />
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
