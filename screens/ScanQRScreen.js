import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {BarCodeScanner, Constants, Permissions} from 'expo';
import global from '../global';

export default class App extends Component {
    state = {
        hasCameraPermission: null
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = data => {
        this.addChildWithQrCode(data.data);
    };

    addChildWithQrCode(qr) {
        let childId = this.getIdFromQr(qr);
        if (!global.childrenIds.includes(childId)) {
            global.childrenIds.push(childId);
            Alert.alert("New target", "Oh, you add new target!");
        }
    }

    getIdFromQr(qr) {
        // FIXME: add implementation
        return "111";
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        (<Text>Add next child to your tracked pocket!</Text>,
                            <BarCodeScanner
                                onBarCodeRead={this._handleBarCodeRead}
                                style={{height: 200, width: 200}}
                            />)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    }
});
