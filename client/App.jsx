// font related imports
import { useFonts } from '@use-expo/font';
import AppLoading from 'expo-app-loading';

// navigation related imports
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigators/stack';

//redux related imports
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
	// loading all required fonts.
	const [isLoaded] = useFonts({
		'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
		'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
	});

	if (!isLoaded) {
		return <AppLoading />;
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NavigationContainer>
					<AppStack />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
