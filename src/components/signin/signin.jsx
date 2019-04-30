import {h, Component} from 'preact';
import {firebase, firebaseui} from '~/src/firebase.ts';
// @ts-ignore
import style from './signin.scss';

export class SignIn extends Component {
    componentDidMount() {
        var uiConfig = {
            signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            ],
            // tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            tosUrl: '<your-tos-url>',
            // Privacy policy url/callback.
            privacyPolicyUrl: function() {
              window.location.assign('<your-privacy-policy-url>');
            }
          };
    
        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#signin', uiConfig);
    }

    render() {
        return <div id="signin" />
    }
}