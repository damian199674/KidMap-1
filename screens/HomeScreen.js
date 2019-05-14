import ScanQRScreen from "./ScanQRScreen";
import DisplayQRScreen from "./DisplayQRScreen";
import global from '../global';
import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import firebase from 'firebase';
import { Button} from 'native-base';
import LoginForm from '../components/LoginForm';


export default class HomeScreen extends Component {
    state = { logged: null };

    //FIREBASE
    componentWillMount(){
        const Firebaseconfig = {
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            };

        firebase.initializeApp(Firebaseconfig);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ logged: true })
            } else {
                this.setState({ logged: false })
            }
        });
    }

    static navigationOptions = {
      title: 'Home',
    };

    renderComponent() {
        if (this.state.logged) {
            return (
                <Button style={{ padding: 5 }}
                block
                rounded
                info
                onPress={() => firebase.auth().signOut()}
            >
                    {
                        this.getComponentForLogged()
                    }
                <Text> Sign out</Text>
            </Button>
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
        return global.isParent ? <ScanQRScreen/> : <DisplayQRScreen qrCode={global.qrCode}/>;
    }
}