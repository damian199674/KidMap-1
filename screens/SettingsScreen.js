import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import RegisterForm from '../components/RegisterForm';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

render() {
    return (
        <View>
             <Text>.....</Text>
        </View>
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
