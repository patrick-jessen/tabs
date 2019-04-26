import * as fb from 'firebase/app';
import * as fbui from 'firebaseui';

var config = {
    apiKey: "AIzaSyAqm30C2Gps03lokEwMwUAbsgVwkn8thMM",
    authDomain: "chords-dk.firebaseapp.com",
    databaseURL: "https://chords-dk.firebaseio.com",
    projectId: "chords-dk",
    storageBucket: "chords-dk.appspot.com",
    messagingSenderId: "668144377846"
};
fb.initializeApp(config);

export const firebase = fb;
export const firebaseui = fbui;