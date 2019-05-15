import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import firebase from 'firebase';
import {Input, Form, Item, Button, Label, Header } from 'native-base';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password1: '', password2:'', error: ''};
  }

  
    onButtonRegisterPress() {
      this.setState({ error: ''})
      const { email, password1, password2 } = this.state;
      if (password1===password2){
        firebase.auth().createUserWithEmailAndPassword(email, password1)
              .catch((error) => {
                  alert(error.message)      
              })
              alert('Your account has been created')
        } else{
            alert('invalid password')
        }
      }
    
    render() {
      return (
      <View style={styles.container}>
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
                      value={this.state.password1}
                      autoCapitalize="none"
                      onChangeText={(password1) => this.setState({ password1 })}
  
                  />
          </Item>
          <Item inlineLabel>
              <Label>Password:</Label>
                  <Input
                      secureTextEntry={true}
                      value={this.state.password2}
                      autoCapitalize="none"
                      onChangeText={(password2) => this.setState({ password2 })}
  
                  />
          </Item>
          <Button style={{ padding: 5 }}
          block
          rounded
          info
          onPress={this.onButtonRegisterPress.bind(this)}
          >
            <Text> Register</Text>
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
  }
