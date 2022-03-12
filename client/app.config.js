const APP_TYPE = process.env.APP_TYPE;

const getPackageName = () => {
	switch (APP_TYPE) {
		case 'dev':
			return 'com.neil_140301.myiitj.dev';
		case 'preview':
			return 'com.neil_140301.myiitj.preview';
		default:
			return 'com.neil_140301.myiitj.dev';
	}
};

const config = () => ({
	name: 'MyIITJ',
	slug: 'my-iitj-v1',
	owner: 'myiitj',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/icons/icon.png',
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
		bundleIdentifier: 'com.neil-140301.myiitj',
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/icons/adaptive-icon.png',
			backgroundColor: '#FFFFFF',
		},
		package: getPackageName(),
	},
	web: {
		favicon: './assets/icons/favicon.png',
	},
});

export default config;
