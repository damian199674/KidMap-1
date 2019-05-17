import React, { Component } from 'react';
import firebase from 'firebase';
import { FirebaseConfig } from '../FirebaseConfig'

firebase.initializeApp(FirebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const defualtState = { logged: false, uid: "", childLocation: undefined }

export function observeStates(then) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            then.setState({ logged: true })
            then.setState({ uid: user.uid })
            getChildLocation(user.uid, then);

        } else {
            then.setState({ logged: false })
            then.setState({ childLocation: undefined })
        }
    });
}

function getChildLocation(uid, then) {
    const dbRefObject = database.ref().child(uid);
    dbRefObject.on('value', snap => {
        childUid = snap.val().child
        const childRefObject = database.ref().child(childUid);
        childRefObject.on('value', snap => {
            then.setState({ childLocation: snap.val().location })
        })
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