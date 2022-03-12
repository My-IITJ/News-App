// Implementing our stack to navigate between screens.

import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './tabs';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import PostComments from '../screens/PostComments';
import TagDetails from '../screens/TagDetails';

// theme related imports
import { ThemeProvider } from 'styled-components'; // allows us to pass the current theme to all components
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import BackBtn from '../components/BackBtn';
import Welcome from '../screens/Welcome';
import Icon from '../components/Icon';
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';

const screens = (theme) => {
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
						<Icon
							containerStyle={{ marginRight: 20 }}
							width={10}
							height={10}
							src={require('../assets/images/icon.png')}
						/>
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
	];
};

const Stack = createStackNavigator();

const AppStack = () => {
	const currentTheme = useSelector((s) => s.user.theme);

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
				}}
			>
				{screens(currentTheme).map(({ name, Component, options, props }) => (
					<Stack.Screen key={name} name={name} options={options}>
						{(p) => <Component {...p} {...props} />}
					</Stack.Screen>
				))}
			</Stack.Navigator>
		</ThemeProvider>
	);
};

export default AppStack;
