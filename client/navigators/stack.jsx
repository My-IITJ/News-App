// Implementing our stack to navigate between screens.

import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './tabs';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import PostComments from '../screens/PostComments';

const Stack = createStackNavigator();

const AppStack = () => {
	return (
		<>
			<Stack.Navigator>
				<Stack.Screen name="Landing">{(p) => <Tabs {...p} />}</Stack.Screen>

				<Stack.Screen name="Profile">{(p) => <Profile {...p} />}</Stack.Screen>
				<Stack.Screen name="NewPost">{(p) => <NewPost {...p} />}</Stack.Screen>
				<Stack.Screen name="PostComments">
					{(p) => <PostComments {...p} />}
				</Stack.Screen>
			</Stack.Navigator>
		</>
	);
};

export default AppStack;
