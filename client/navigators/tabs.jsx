// Implementing bottom tabs for the landing page.

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Explore from '../screens/Explore';

// example icons from a package
import { AntDesign, Feather } from '@expo/vector-icons';

// a list of all tabs. We may add more in future.
//For the options object:  you see a list of available options from the docs.
const tabs = [
	{
		name: 'Home',
		Component: Home,
		options: {
			tabBarIcon: ({ color }) => (
				<AntDesign name="home" size={24} color={color} />
			),
		},
	},
	{
		name: 'Explore',
		Component: Explore,
		options: {
			tabBarIcon: ({ color }) => (
				<Feather name="search" size={24} color={color} />
			),
		},
	},
];

const BottomTabs = createBottomTabNavigator();

const Tabs = () => {
	return (
		<>
			<BottomTabs.Navigator
				screenOptions={() => {
					return {
						tabBarLabelStyle: {
							fontSize: 15,
						},
						tabBarActiveTintColor: 'teal',
						tabBarHideOnKeyboard: true,
						tabBarStyle: {
							backgroundColor: '#fff',
							height: 70,
							padding: 5,
							paddingBottom: 15,
						},
						//hide or show the header
						headerShown: true,
					};
				}}
			>
				{tabs.map(({ name, Component, options, props }) => {
					return (
						<BottomTabs.Screen key={name} name={name} options={options}>
							{(p) => <Component {...p} {...props} />}
						</BottomTabs.Screen>
					);
				})}
			</BottomTabs.Navigator>
		</>
	);
};

export default Tabs;
