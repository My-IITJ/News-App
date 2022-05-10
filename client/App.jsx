import { LogBox } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

// font related imports
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

// navigation related imports
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigators/stack';

//redux related imports
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// react query related imports
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppState, useOnlineManager } from './apiCalls/hooks';
import { useCallback, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { authUser } from './redux/userSlice';
import { fetchUserToken } from './apiCalls/auth';
import { defaultImgUrl } from './apiCalls/client';

LogBox.ignoreLogs(['Setting a timer']);
const queryClient = new QueryClient();

export default function App() {
	useOnlineManager();
	useAppState();
	const [initializing, setInitializing] = useState(true);
	const dispatch = useDispatch();

	// loading all required fonts.
	const [isLoaded] = useFonts({
		Poppins_400Regular,
	});

	const onAuthStateChanged = useCallback(
		async (user) => {
			// console.log(user);
			let data = user;
			if (user) {
				const { _id, profileImg } = await fetchUserToken({
					email: user.email,
					displayName: user.displayName,
					photoUrl: user.photoURL || defaultImgUrl,
					uid: user.uid,
				});

				data = { _id, profileImg };
			}

			dispatch(authUser(data));
			if (initializing) setInitializing(false);
		},
		[initializing, dispatch]
	);

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, [onAuthStateChanged]);

	if (!isLoaded || initializing) {
		return <AppLoading />;
	}

	return (
		<PersistGate loading={null} persistor={persistor}>
			<QueryClientProvider client={queryClient}>
				<RootSiblingParent>
					<NavigationContainer>
						<AppStack />
					</NavigationContainer>
				</RootSiblingParent>
			</QueryClientProvider>
		</PersistGate>
	);
}
