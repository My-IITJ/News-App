const config = () => ({
	name: 'My IITJ',
	slug: 'my-iitj-v1',
	owner: 'myiitj',
	version: '1.0.2',
	orientation: 'portrait',
	icon: './assets/icon.png',
	scheme: 'myiitj',
	splash: {
		image: './assets/icon.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff',
	},
	updates: {
		fallbackToCacheTimeout: 0,
		url: "https://u.expo.dev/aaadadb2-b64f-4b09-b73e-4d36b8369836"
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
		bundleIdentifier: 'com.iitj.myiitj',
		googleServicesFile: "./GoogleService-Info.plist"
	},
	android: {
		package: 'com.iitj.myiitj',
		googleServicesFile: "./google-services.json",
		versionCode: 3,
	},
	web: {
		favicon: './assets/icons/favicon.png',
	},
	plugins: [
		'@react-native-firebase/app',
		'@react-native-google-signin/google-signin',
	],
	jsEngine: "hermes",
	extra: {	
		"eas": {
		  "projectId": "aaadadb2-b64f-4b09-b73e-4d36b8369836"
		}
	  },
});

export default config;
