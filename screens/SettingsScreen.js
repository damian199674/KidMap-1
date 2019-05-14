import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import RegisterForm from '../components/RegisterForm';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <RegisterForm />
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
