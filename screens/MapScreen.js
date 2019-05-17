import React from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { Location, MapView, Permissions } from 'expo';
import mapStyle from '../assets/mapStyle.json';
import { defaultState, observeStates } from '../firebase/firebase';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
    };

    state = Object.assign(
        {
            mapRegion: {
                latitude: 50.062463,
                longitude: 19.944783,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0422
            },
            locationResult: ""
        },
        defaultState)


    componentWillMount() {
        this._getLocationAsync();
        observeStates(this);
    }

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

    ShowKid = () => {
        this.setState({
            mapRegion: {
                latitude: this.state.childLocation.latitude,
                longitude: this.state.childLocation.longitude,
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
                    {this.renderChildMarker()}
                </MapView>

                {this.renderShowChildButton()}
            </View>
        );
    }

    renderChildMarker() {
        if (this.state.childLocation) {
            return (
                <MapView.Marker coordinate={this.state.childLocation}>
                    <Image
                        source={require('../assets/images/baby.png')}
                        style={styles.markerImage} />
                </MapView.Marker>
            )
        }
    }

    renderShowChildButton() {
        if (this.state.childLocation) {
            return (
                <View style={styles.button}>
                    <Button
                        onPress={this.ShowKid}
                        title="Pokaż dziecko"
                    />
                </View>
            )
        }
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
