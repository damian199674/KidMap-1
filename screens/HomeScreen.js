import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import ScanQRScreen from "./ScanQRScreen";
import DisplayQRScreen from "./DisplayQRScreen";
import global from '../global';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={require('../assets/images/family.png')}
                            style={styles.welcomeImage}
                        />
                    </View>
                    <Text style={styles.getStartedText}>Welcome to Kid Map!</Text>
                    {
                        global.isLogged ? this.getComponentForLogged() :
                            <Text style={styles.getStartedText}>Create an account or log in.</Text>
                    }
                </ScrollView>
            </View>
        );
    }

    getComponentForLogged() {
        return global.isParent ? <ScanQRScreen/> : <DisplayQRScreen qrCode={global.qrCode}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedText: {
        fontSize: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
});
