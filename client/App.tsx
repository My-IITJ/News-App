import { LogBox, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

// font related imports
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

// navigation related imports
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './navigators/drawer';

//redux related imports
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

// react query related imports
import { QueryClient, QueryClientProvider } from 'react-query';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppState, useOnlineManager } from './apiCalls/hooks';
import * as Sentry from "@sentry/react-native";

// auth related imports
import { useCallback, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { authUser, updateToken } from './redux/userSlice';
import { updateUserData } from './apiCalls/auth';
import { defaultImgUrl, getUserRole } from './apiCalls/client';

import { ThemeProvider } from 'styled-components'; // allows us to pass the current theme to all components



import 'react-native-gesture-handler';

LogBox.ignoreLogs(['Setting a timer']);
const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: "https://4dffedfebe5d4753aaa7f902566c6664@o4504106688315392.ingest.sentry.io/4504106690936832",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});


function App() {
	useOnlineManager();
	useAppState();
	const [initializing, setInitializing] = useState(true);
	const dispatch = useDispatch();

	// loading all required fonts.
	const [isLoaded] = useFonts({
		Poppins_400Regular,
	});
	const rootState = useSelector((s:RootStateOrAny) => s.user);


	const onAuthStateChanged = useCallback(
		async (user) => {
			let data = user;
			if (user) {
				const role = getUserRole(user.email)
				const { _id, profileImg } = await updateUserData({
					email: user.email,
					displayName: user.displayName,
					photoUrl: user.photoURL || defaultImgUrl,
					role: role,
					uid: user.uid,
				});

				data = {
					_id,
					profileImg,
					role: role,
					email: user.email,
				};
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

	const onLayoutRootView = useCallback(async () => {
		if (isLoaded && !initializing) {
			await SplashScreen.hideAsync();
			console.log('app loaded');
		}
	}, [initializing, isLoaded]);
	if (!isLoaded || initializing) {
		// return <AppLoading />;
		console.log('app not loaded');
		return;
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'red',
			}}
			onLayout={onLayoutRootView}
		>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<RootSiblingParent>
						<ThemeProvider theme={rootState.theme}>
						<NavigationContainer>
							<MyDrawer />
						</NavigationContainer>
						</ThemeProvider>
						
					</RootSiblingParent>
				</QueryClientProvider>
			</PersistGate>
		</View>
	);
}


export default Sentry.wrap(App);