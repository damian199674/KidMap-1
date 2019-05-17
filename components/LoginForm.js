import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import {login} from '../firebase/firebase';
import {Input, Form, Item, Button, Label} from 'native-base';

export default class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = { email: '', password: '', error: '' };
    }

    onButtonLoginPress() {
      login(this.state)
    }
  
    render() {
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
