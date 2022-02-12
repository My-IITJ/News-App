// Implementing our stack to navigate between screens.

import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './tabs';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import PostComments from '../screens/PostComments';

// theme related imports
import { ThemeProvider } from 'styled-components'; // allows us to pass the current theme to all components
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

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
					// to toggle the header. best to keep false
					headerShown: false,
				}}
			>
				<Stack.Screen name="Landing">{(p) => <Tabs {...p} />}</Stack.Screen>

				<Stack.Screen name="Profile">{(p) => <Profile {...p} />}</Stack.Screen>
				<Stack.Screen name="NewPost">{(p) => <NewPost {...p} />}</Stack.Screen>
				<Stack.Screen name="PostComments">
					{(p) => <PostComments {...p} />}
				</Stack.Screen>
			</Stack.Navigator>
		</ThemeProvider>
	);
};

export default AppStack;
