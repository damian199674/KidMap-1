import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';


//KEYS
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
  };
  
firebase.initializeApp(firebaseConfig);

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = ({
            email: '',
            password: ''
        });
    }
    static navigationOptions = {
        header: null,
    };


    login = (email, password) => {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
        }
        catch (error) {
            alert("Incorrect e-mail or password")
        }
    }



    render() {
        const{ navigate } = this.props.navigation;
        return (
            <Container style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={require('../assets/images/family.png')}
                            style={styles.welcomeImage}
                        />
                    </View>
                    <Text style={styles.getStartedText}>Welcome to Kid Map!</Text>

                    <Text style={styles.getStartedText}>
                        Create an account or log in.</Text>
                
                    <Form style={styles.form}>
                        <Item inlineLabel>
                            <Label>Email:</Label>
                                <Input
                                    onChangeText={(email) => this.setState({ email })}
                                />
                        </Item>
                        <Item inlineLabel>
                            <Label>Password:</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                        </Item>
                        <Button style={{ padding: 5 }}
                            block
                            rounded
                            success
                            onPress={() => this.login(this.state.email, this.state.password)}
                        >
                            <Text> Login</Text>
                        </Button>
                        <Button style={{ padding: 5 }}
                            block
                            rounded
                            info
                            onPress={() => navigate('Register')}
                        >
                            <Text> Join free!</Text>
                        </Button>
                        <Button style={{ padding: 5 }}
                            block
                            rounded
                            light
                            onPress={() => alert('Facebook')}
                        >
                            <Text> Facebook</Text>
                        </Button>
                    </Form>
                </ScrollView>
            </Container>
        );
    }
}

class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    signUp = (email, password) => {
        try {
            if (this.state.password.length < 6) {
                alert("Please enter at least 6 characters")
                return;
            }    
            firebase.auth().createUserWithEmailAndPassword(email, password)
        }
        catch (error) {
            alert('Something went wrong')
        }
    }

    render() {
        const{ navigate } = this.props.navigation;
        return (
            <Container style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Form style={styles.form}>
                        <Item inlineLabel>
                            <Label>Email:</Label>
                                <Input
                                    onChangeText={(email) => this.setState({ email })}
                                />
                        </Item>
                        <Item inlineLabel>
                            <Label>Password:</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                        </Item>
                        <Button style={{ padding: 5 }}
                            block
                            rounded
                            info
                            onPress={() => this.signUp(this.state.email, this.state.password)}
                        >
                            <Text> Sign Up</Text>
                        </Button>
                    </Form>
                </ScrollView>
            </Container>
        );
    }
}


class PairScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <Text>ADD YOUR KID</Text>
        );
    }
}


const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Register : { screen: RegisterScreen },
  Pair : { screen: PairScreen },
}, { initialRouteName: 'Home'});

export default createAppContainer(AppNavigator);
    
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
        width: 80,
        height: 60,
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
    form: {
        marginTop: 10,
    },
});
