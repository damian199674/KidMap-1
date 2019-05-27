import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import {login} from '../firebase/firebase';
import {Input, Form, Item, Button, Label} from 'native-base';

export default class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = { email: '', password: '', error: '' };
    }
    static navigationOptions = {
      header: null,
    };

    onButtonLoginPress() {
      login(this.state)
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.getStartedText}>Sign in</Text>
          <Form style={styles.form}>
            <Item fixedLabel >
              <Label>Email:</Label>
                <Input
                    value={this.state.email}
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({ email })}
                />
            </Item>
            <Item fixedLabel >
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
