import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Some kind of a map...</Text>
      </ScrollView>
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
