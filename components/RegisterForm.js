import React, {Component} from 'react';
import {Switch, Text, View} from 'react-native';
import {register} from '../firebase/firebase';
import {Button, Form, Input, Item, Label} from 'native-base';

export default class RegisterForm extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {email: '', password1: '', password2: '', isParent: true, error: ''};
    }

    onButtonRegisterPress() {
        register(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.getStartedText}>Sign Up</Text>
                <Text style={styles.getStartedText}>
                    It’s free and always will be.</Text>
                <Form style={styles.form}>
                    <Item fixedLabel>
                        <Label>Email:</Label>
                        <Input
                            value={this.state.email}
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({email})}
                        />
                    </Item>
                    <Item fixedLabel>
                        <Label>Password:</Label>
                        <Input
                            secureTextEntry={true}
                            value={this.state.password1}
                            autoCapitalize="none"
                            onChangeText={(password1) => this.setState({password1})}

                        />
                    </Item>
                    <Item fixedLabel>
                        <Label>Confirm password:</Label>
                        <Input
                            secureTextEntry={true}
                            value={this.state.password2}
                            autoCapitalize="none"
                            onChangeText={(password2) => this.setState({password2})}

                        />
                    </Item>
                    <Item>
                        <Label>Are you parent?</Label>
                        <Switch
                            onValueChange={(isParent) => this.setState({isParent})}
                            value={this.state.isParent}/>
                    </Item>
                    <Button style={{padding: 5}}
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
