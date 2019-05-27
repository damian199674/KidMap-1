import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarCodeScanner, Constants, Permissions} from 'expo';
import {addChildWithQr, defaultState, observeStates} from '../firebase/firebase';


export default class App extends Component {

    state = Object.assign(
        {
            hasCameraPermission: null
        },
        defaultState)

    componentDidMount() {
        this._requestCameraPermission();
        observeStates(this);
    }

    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = data => {
        addChildWithQr(this.state.uid, data.data);
    };


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
