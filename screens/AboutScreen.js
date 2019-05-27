import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  };

render() {
    return (
        <View>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/family.png')}
              style={styles.welcomeImage}
            />
          </View>
          <Text style={styles.getStartedText}>Simple mobile app for localizing where is your kid!  Built with React Native. </Text>
          <View style={styles.space}></View>
          <Text style={styles.getStartedText}> Our website: https://akubala.github.io/KidMap/ </Text>
          <View style={styles.space}></View>
          <Text style= {styles.authorsText}> {`
            AUTHORS:
            Piotr Drożdż
            Damian Górski
            Jakub Krzemień
            Adrian Kubala
          `}</Text>
          <View style={styles.space}></View>
          <Text > version: 1.0 </Text>
        </View>
    );
}
}

const styles = {
    container: {
        backgroundColor: '#fff',
    },
    space: {
        marginTop: 10,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 120,
        height: 90,
        resizeMode: 'contain',
        margin: 'auto'
    },
    getStartedText: {
        fontSize: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    authorsText: {
      fontSize: 20,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
    },
    form: {
        marginTop: 10,
    },
};

