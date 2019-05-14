import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import firebase from 'firebase';
import {Input, Form, Item, Button, Label} from 'native-base';
//import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = { email: '', password: '', error: '' };
    }

    onButtonLoginPress() {
      this.setState({ error: ''})
      const { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.login.bind(this))
            .catch((error) => {
                alert(error.message)      
            });
    }
    
    login() {
      this.setState({
        email: '', password: '', error: ''
      })
    }
  
    render() {
      //const{ navigate } = this.props.navigation;
      return (
          <View style={styles.container}>
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
                  value={this.state.email}
                  autoCapitalize="none"
                  onChangeText={(email) => this.setState({ email })}
              />
          </Item>
          <Item inlineLabel>
              <Label>Password:</Label>
                  <Input
                      secureTextEntry={true}
                      value={this.state.password}
                      autoCapitalize="none"
                      onChangeText={(password) => this.setState({ password })}
  
                  />
          </Item>
          <Button style={{ padding: 5 }}
          block
          rounded
          success
          onPress={this.onButtonLoginPress.bind(this)}
          >
            <Text> Login</Text>
          </Button>
          {/* <Button style={{ padding: 5 }}
          block
          rounded
          info
          onPress={() => navigate('Register')}
          >
            <Text> Join free!</Text>
          </Button>  */}
        </Form>
        </View>
      );
    }
  }



  
  const styles = {
    container: {
      backgroundColor: '#fff',
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
