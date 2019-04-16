import React from 'react';
import {StyleSheet, View,} from 'react-native';
import QRCode from 'react-native-qrcode';

export default class DisplayQRScreen extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value={this.props.qrCode}
                    size={200}
                    bgColor='black'
                    fgColor='white'/>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});
 