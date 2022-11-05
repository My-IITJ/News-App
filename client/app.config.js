const config = () => ({
	name: 'MyIITJ',
	slug: 'my-iitj-v1',
	owner: 'myiitj',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/icons/icon.png',
	scheme: 'myiitj',
	splash: {
		image: './assets/icons/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff',
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
		bundleIdentifier: 'com.iitj.myiitj',
		googleServicesFile: "./GoogleService-Info.plist"
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/icons/adaptive-icon.png',
			backgroundColor: '#FFFFFF',
		},
		package: 'com.iitj.myiitj',
		googleServicesFile: "./google-services.json",
	},
	web: {
		favicon: './assets/icons/favicon.png',
	},
	plugins: [
		'@react-native-firebase/app',
		'@react-native-google-signin/google-signin',
	],
});

export default config;
