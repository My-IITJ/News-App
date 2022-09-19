import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const APP_TYPE = process.env.APP_TYPE;

const getWebClientId = () => {
	switch (APP_TYPE) {
		case 'dev':
			return '379614937476-76bdg50kjohnd7qni3o7odrpf46si1td.apps.googleusercontent.com';
		case 'preview':
			return '696540223154-md2pnvl7eegrgb68qle3ea447noqu76d.apps.googleusercontent.com';
		default:
			return '379614937476-76bdg50kjohnd7qni3o7odrpf46si1td.apps.googleusercontent.com';
	}
};

GoogleSignin.configure({
	webClientId: getWebClientId(),
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
