import ScanQRScreen from "./ScanQRScreen";
import DisplayQRScreen from "./DisplayQRScreen";
import global from '../global';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { auth, defualtState, observeStates } from '../firebase/firebase';
import { Button } from 'native-base';
import LoginForm from '../components/LoginForm';


export default class HomeScreen extends Component {
    state = defualtState;

    componentWillMount() {
        observeStates(this);
    }

    static navigationOptions = {
        title: 'Home',
    };

    renderComponent() {
        if (this.state.logged) {
            return (
                <View>
                    <Button style={{ padding: 5 }}
                        block
                        rounded
                        info
                        onPress={() => auth.signOut()}
                    >

                        <Text> Sign out</Text>
                    </Button>
                    {
                        this.getComponentForLogged()
                    }
                </View>
            );
        } else {
            return (
                <LoginForm />
            );
        }
    }
    render() {
        return (
            <View>
                {this.renderComponent()}
            </View>
        );
    }

    getComponentForLogged() {
        return global.isParent ? <ScanQRScreen /> : <DisplayQRScreen qrCode={this.state.uid} />;
    }
}