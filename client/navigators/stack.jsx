// Implementing our stack to navigate between screens.

import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import Tabs from './tabs';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import PostComments from '../screens/PostComments';
import TagDetails from '../screens/TagDetails';
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';
import Welcome from '../screens/Welcome';
import Activity from '../screens/Activity';

// theme related imports
import { ThemeProvider } from 'styled-components'; // allows us to pass the current theme to all components
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { COLORS, isSmall } from '../constants';
import BackBtn from '../components/BackBtn';
import Icon from '../components/Icon';
import { Animated, TouchableOpacity } from 'react-native';

const AuthScreens = (theme) => {
	return [
		{
			name: 'Welcome',
			Component: Welcome,
		},
		{
			name: 'Register',
			Component: Register,
		},
		{
			name: 'SignIn',
			Component: SignIn,
		},
	];
};

const screens = (theme) => {
	return [
		{
			name: 'Landing',
			Component: Tabs,
		},
		{
			name: 'Profile',
			Component: Profile,
		},
		{
			name: 'NewPost',
			Component: NewPost,
		},
		{
			name: 'PostComments',
			Component: PostComments,
			options: ({ navigation }) => ({
				headerShown: true,
				headerShadowVisible: false,
				title: '',
				headerLeft: (p) => {
					return <BackBtn {...p} navigation={navigation} />;
				},
				headerRight: () => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
							<Icon
								containerStyle={{ marginRight: 20 }}
								width={40}
								height={40}
								src={require('../assets/images/icon.png')}
							/>
						</TouchableOpacity>
					);
				},
				headerStyle: {
					backgroundColor:
						theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1,
				},
			}),
		},
		{
			name: 'TagDetails',
			Component: TagDetails,
			options: ({ navigation }) => ({
				headerShown: true,
				headerShadowVisible: false,
				title: '',
				headerLeft: (p) => {
					return <BackBtn {...p} navigation={navigation} />;
				},
				headerStyle: {
					backgroundColor:
						theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1,
				},
			}),
		},
		{
			name: 'Activity',
			Component: Activity,
			options: ({ navigation }) => ({
				headerShown: true,
				headerShadowVisible: false,
				title: 'Activity',
				headerLeft: (p) => {
					return <BackBtn {...p} navigation={navigation} />;
				},
				headerStyle: {
					backgroundColor:
						theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1,
				},
				headerTitleStyle: {
					color: theme.name === 'dark' ? COLORS.white1 : COLORS.black,
					fontSize: isSmall ? 22 : 28,
					fontFamily: 'Poppins_400Regular',
					fontWeight: 'bold',
				},
			}),
		},
	];
};

const Stack = createStackNavigator();

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
	const progress = Animated.add(
		current.progress.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		}),
		next
			? next.progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolate: 'clamp',
			  })
			: 0
	);

	return {
		cardStyle: {
			transform: [
				{
					translateX: Animated.multiply(
						progress.interpolate({
							inputRange: [0, 1, 2],
							outputRange: [
								screen.width, // Focused, but offscreen in the beginning
								0, // Fully focused
								screen.width * -0.3, // Fully unfocused
							],
							extrapolate: 'clamp',
						}),
						inverted
					),
				},
			],
		},
	};
};

const AppStack = () => {
	const { theme: currentTheme, data } = useSelector((s) => s.user);

	return (
		<ThemeProvider theme={currentTheme}>
			{
				// eslint-disable-next-line react/style-prop-object
				<StatusBar
					translucent
					style={currentTheme.name === 'dark' && 'light'}
				/>
			}
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					transitionSpec: {
						open: TransitionSpecs.TransitionIOSSpec,
						close: TransitionSpecs.TransitionIOSSpec,
					},
					cardStyleInterpolator: forSlide,
					detachPreviousScreen: false,
				}}
			>
				{!data
					? AuthScreens(currentTheme).map(
							({ name, Component, options, props }) => (
								<Stack.Screen key={name} name={name} options={options}>
									{(p) => <Component {...p} {...props} />}
								</Stack.Screen>
							)
					  )
					: screens(currentTheme).map(({ name, Component, options, props }) => (
							<Stack.Screen key={name} name={name} options={options}>
								{(p) => <Component {...p} {...props} />}
							</Stack.Screen>
					  ))}
			</Stack.Navigator>
		</ThemeProvider>
	);
};

export default AppStack;
