import React from 'react';
import firebase from 'firebase';
import {FirebaseConfig} from '../FirebaseConfig'

firebase.initializeApp(FirebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const defualtState = {logged: false, uid: "", childLocation: undefined, isParent: null}

export function observeStates(then) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            then.setState({logged: true})
            then.setState({uid: user.uid})
            then.props.navigation.navigate('Home')
            getChildLocation(user.uid, then);

        } else {
            then.setState({logged: false})
            then.setState({childLocation: undefined})
        }
    });
}

function getChildLocation(uid, then) {
    const dbRefObject = database.ref().child(uid);
    dbRefObject.on('value', snap => {
        childUid = snap.val().child
        if (childUid) {
            const childRefObject = database.ref().child(childUid);
            childRefObject.on('value', snap => {
                then.setState({childLocation: snap.val().location})
            })
        }
        then.setState({isParent: snap.val().isParent});
    });
}

export function register(data) {
    const {email, password1, password2, isParent} = data;
    if (password1 === password2) {
        auth.createUserWithEmailAndPassword(email, password1)
            .catch((error) => {
                alert(error.message)
            })
            .then((authData) => {
                createDatabaseRecord(authData.user.uid, isParent)
                alert('Your account has been created')
            })
    } else {
        alert('invalid password')
    }
}

function createDatabaseRecord(uid, isParent) {
    database.ref().child(uid).set({
        child: "",
        location: {
            latitude: 0,
            longitude: 0,
        },
        isParent: isParent
    });
}

export function login(data) {
    const {email, password} = data;
    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            alert(error.message)
        });
}

export function sendLocation(uid, location) {
    database.ref().child(uid).child('location').set(location)
}

export function addChildWithQr(uid, qrCode) {
    const child = database.ref().child(qrCode)
    child.on('value', snap => {
            database.ref().child(uid).child('child').set(qrCode)
        }
    )
}