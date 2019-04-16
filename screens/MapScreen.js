import React from 'react';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  state = {
    mapRegion: { latitude: 50.062463, longitude: 19.944783, latitudeDelta: 0.0422, longitudeDelta: 0.0422 },
    locationResult: null,
    location: {coords: { latitude: 50.062463, longitude: 19.944783}},
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
        locationResult: 'Permission to access location was denied',
        location,
      });
    }
 
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0422, longitudeDelta: 0.0422 }});
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={this.state.mapRegion}
        onRegionChange={this._handleMapRegionChange}
      >
      <MapView.Marker
        coordinate={this.state.location.coords}
        title="Pioter House"
        description="Dom Piotera"
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
