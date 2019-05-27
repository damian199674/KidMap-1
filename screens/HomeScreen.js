import ScanQRScreen from "./ScanQRScreen";
import DisplayQRScreen from "./DisplayQRScreen";
import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {defualtState, observeStates} from '../firebase/firebase';
import {Button} from 'native-base';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import firebase from 'firebase';
import {createAppContainer, createStackNavigator} from 'react-navigation';


class HomeScreen extends Component {
    state = defualtState;

    componentWillMount() {
        observeStates(this);
    }

    static navigationOptions = {
        header: null,
    };

    renderComponent() {
        const {navigate} = this.props.navigation;
        if (this.state.logged) {
            return (
                <View>
                    <Button style={{padding: 5}}
                            block
                            rounded
                            info
                            onPress={() => firebase.auth().signOut()}
                    >
                        <Text> Sign out</Text>
                    </Button>
                    <View style={styles.space}></View>
                    {
                        this.getComponentForLogged()
                    }
                </View>
            );
        } else {
            return (
                <View>
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={require('../assets/images/family.png')}
                            style={styles.welcomeImage}
                        />
                    </View>
                    <Text style={styles.getStartedText}>Welcome to Kid Map!</Text>
                    <Text style={styles.getStartedText}>
                        Create an account or log in.</Text>
                    <View style={styles.space}></View>
                    <Button style={{padding: 10}}
                            block
                            rounded
                            success
                            onPress={() => navigate('Login')}
                    >
                        <Text> Login</Text>
                    </Button>
                    <View style={styles.space}></View>
                    <Button style={{padding: 5}}
                            block
                            rounded
                            info
                            onPress={() => navigate('Register')}
                    >
                        <Text> Register</Text>
                    </Button>
                </View>
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
        return this.state.isParent ? <ScanQRScreen/> : <DisplayQRScreen qrCode={this.state.uid}/>;
    }
}

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Login: {screen: LoginForm},
    Register: {screen: RegisterForm}
});
const App = createAppContainer(MainNavigator);

export default App;

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
    form: {
        marginTop: 10,
    },
};

