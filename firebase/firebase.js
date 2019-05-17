import React, { Component } from 'react';
import firebase from 'firebase';
import FireBaseConfig from '../FirebaseConfig'

const config = FireBaseConfig;
firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const defualtState = {logged: false, uid: ""}

export function observeStates(then) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            then.setState({ logged: true })
            then.setState({ uid: user.uid})
        } else {
            then.setState({ logged: false })
        }
    });
}

export function register(data) {
    const { email, password1, password2 } = data;
    if (password1 === password2) {
        auth.createUserWithEmailAndPassword(email, password1)
            .catch((error) => {
                alert(error.message)
            })
        alert('Your account has been created')
    } else {
        alert('invalid password')
    }
}

export function login(data) {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            alert(error.message)
        });
}