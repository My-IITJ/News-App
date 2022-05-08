import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
	webClientId:
		'379614937476-jfj9k358d442h1hbab1mmdnupgf3t0et.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
});

export async function onGoogleButtonPress() {
	// Get the users ID token
	const { idToken } = await GoogleSignin.signIn();
	// Create a Google credential with the token
	const googleCredential = auth.GoogleAuthProvider.credential(idToken);

	// Sign-in the user with the credential
	return auth().signInWithCredential(googleCredential);
}
