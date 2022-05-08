import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
	webClientId:
		'379614937476-76bdg50kjohnd7qni3o7odrpf46si1td.apps.googleusercontent.com',
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
