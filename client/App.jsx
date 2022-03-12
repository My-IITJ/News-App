import { LogBox } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

// font related imports
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

// navigation related imports
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigators/stack';

//redux related imports
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// react query related imports
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppState, useOnlineManager } from './apiCalls/hooks';

LogBox.ignoreLogs(['Setting a timer']);
const queryClient = new QueryClient();

export default function App() {
	useOnlineManager();
	useAppState();

	// loading all required fonts.
	const [isLoaded] = useFonts({
		Poppins_400Regular,
	});

	if (!isLoaded) {
		return <AppLoading />;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RootSiblingParent>
						<NavigationContainer>
							<AppStack />
						</NavigationContainer>
					</RootSiblingParent>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	);
}
