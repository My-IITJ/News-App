// Drawer menu to be added later
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerNavigationOptions,
	DrawerContentComponentProps,
	useDrawerProgress,
} from '@react-navigation/drawer';
import Utilities from '../screens/Utilities';
import Event from '../screens/Event';
import Interact from '../screens/Interact';
import Academics from '../screens/Academics';
import { AppStack } from './stack';
import { useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import {
	Entypo,
	Foundation,
	MaterialIcons,
	AntDesign,
	Ionicons,
} from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';
import { useAppSelector } from '../redux/store';
import Icon from '../components/Icon';
import { UserData } from '../redux/userSlice';

import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useEffect, useState } from 'react';
import Home from '../screens/Home';
import { StackActions } from '@react-navigation/native';
import Gallery from '../screens/Gallery';

const drawerScreens: DrawerScreenConfig[] = [
	{
		name: "Latest",
		Component: AppStack,
		options: {
			drawerIcon: ({ color, size }) => {
				return (
					<Foundation
						name="social-designer-news"
						size={size}
						color={color}
					/>
				);
			},
		}
	},
	{
		name: "Gallery",
		Component: Gallery,
		options: {
			drawerIcon: ({ color, size }) => {
				return (
					<Entypo
						name="image"
						size={size}
						color={color}
					/>
				);
			}
		}

	},
	{
		name: "Interact",
		Component: Interact,
		options: {
			drawerIcon: ({ color, size }) => {
				return <Entypo name="chat" size={size} color={color} />;
			},
		}
	},
	{
		name: "Academics",
		Component: Academics,
		options: {
			drawerIcon: ({ color, size }) => {
				return <Entypo name="open-book" size={size} color={color} />;
			},
		}
	},
	{
		name: "Events",
		Component: Event,
		options: {
			drawerIcon: ({ color, size }) => {
				return (
					<MaterialIcons name="emoji-events" size={size} color={color} />
				);
			},
		}
	},
	{
		name: "Utilities",
		Component: Utilities,
		options: {
			drawerIcon: ({ color, size }) => {
				return <Entypo name="box" size={size} color={color} />;
			},
		}
	}
];

const Drawer = createDrawerNavigator();


const DrawerItem = ({ Icon, label, onPress, focused = false }: DrawerItemProps) => (
	<TouchableOpacity
		onPress={onPress}
		style={[{
			marginVertical: 10,
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: 4
		}]}
	>
		<View style={{
			width: 30,
			height: 30,
			alignItems: "center",
			justifyContent: "center",
		}}>
			{Icon}
		</View>
		<Text style={{ color: COLORS.white, fontFamily: "Poppins_400Regular", fontSize: 18, marginLeft: 8 }}>{label}</Text>
		<View style={{
			height: 1, backgroundColor: focused ? COLORS.white : COLORS.deepBlue2, width: label.length * 15, position: "absolute", bottom: 0
		}} />
	</TouchableOpacity>
)

const CustomDrawer = ({ props, userData, setProgress }: CustomDrawerProps) => {
	const currentProgress = useDrawerProgress() as Animated.SharedValue<number>;
	const [activeDrawer, setActiveDrawer] = useState(drawerScreens[0].name)

	useEffect(() => {
		setProgress(currentProgress)
	}, [currentProgress, setProgress])


	const handleLogout = useCallback(() => {
		// dispatch(logout());
		auth()
			.signOut()
			.then(() => console.log('User signed out!'));
	}, []);
	return (
		<DrawerContentScrollView
			scrollEnabled={true}
			contentContainerStyle={{
				flex: 1,
			}}
			{...props}
		>
			<View
				style={{
					flex: 1,
					paddingHorizontal: SIZES.radius
				}}
			>

				{/* close button */}
				<View style={{
					alignItems: 'flex-start',
					justifyContent: 'center',
					marginBottom: 15
				}}>
					<TouchableOpacity style={{
						alignItems: 'center',
						justifyContent: 'center'
					}}
						onPress={() => props.navigation.closeDrawer()}
					>
						<AntDesign name="close" size={30} color={COLORS.white} />
					</TouchableOpacity>
				</View>


				{/* profile header */}
				<TouchableOpacity style={{
					flexDirection: 'row', alignItems: 'center', marginTop: SIZES.radius
				}}
					onPress={() => props.navigation.navigate('Profile', {
						_id: userData?._id
					})}
				>
					<Icon
						src={{ uri: userData?.profileImg }}
						width={65}
						height={65}
						radius={SIZES.radius}
						resizeMode="cover"
					/>

					<View style={{
						marginLeft: SIZES.radius
					}}>
						<Text
							style={{
								color: COLORS.white,
								fontSize: 16,
								fontFamily: 'Poppins_400Regular',
								textTransform: "capitalize"
							}}
						>
							Hello!
						</Text>
						<Text
							style={{
								color: COLORS.white,
								fontSize: 14,
								fontFamily: 'Poppins_400Regular',
							}}
						>
							View your profile
						</Text>
					</View>
				</TouchableOpacity>

				{/* drawer items */}
				<View
					style={{
						flex: 1,
						marginTop: SIZES.padding,
						paddingHorizontal: 8
					}}
				>
					{
						drawerScreens.map(({ name, options }) => {
							const focused = activeDrawer === name;
							return (
								<DrawerItem
									key={name}
									onPress={() => {
										if(name === "Latest"){
											// navigate to the first screen of the tab
											props.navigation.navigate("Home", {
												screen: "Latest"
											})
										}
										props.navigation.navigate(name);
										setActiveDrawer(name);
									}}
									focused={focused}
									Icon={options.drawerIcon({ color: COLORS.white, size: 22, focused })}
									label={name}
								/>
							);
						})
					}
				</View>

				<View style={{
					height: 1, backgroundColor: COLORS.gray50,
					width: "80%"
				}} />

				{/* info items */}
				<View style={{
					marginBottom: 15
				}}>
					<DrawerItem Icon={<AntDesign name="appstore-o" size={22} color={COLORS.white} />} label="Version 1.0" onPress={() => { }} />
					<DrawerItem Icon={<Ionicons name="share-social-outline" size={22} color={COLORS.white} />} label="Share" onPress={() => { }} />
					<DrawerItem Icon={<Ionicons name="exit-outline" size={22} color={COLORS.white} />} label="Logout" onPress={() => { 
                handleLogout()
					}} />
				</View>
			</View>
		</DrawerContentScrollView>
	)
}


function MyDrawer() {
	const { data, theme } = useAppSelector(state => state.user);
	const [progress, setProgress] = useState(useSharedValue(0));

	const contentStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: interpolate(progress.value, [0, 1], [1, 0.8]),
			}
		],
		borderRadius: interpolate(progress.value, [0, 1], [0, 26])
	}))

	return (
		<View
			style={{
				flex: 1, backgroundColor: theme.name === 'dark' ? COLORS.deepBlue : COLORS.deepBlue2
			}}
		>
			<Drawer.Navigator
				screenOptions={{
					headerShown: false,
					drawerType: "slide",
					overlayColor: "transparent",
					drawerStyle: {
						flex: 1,
						width: "60%",
						backgroundColor: "transparent"
					},
					sceneContainerStyle: {
						backgroundColor: "transparent"
					},
					swipeEnabled: data != null,
				}}
				drawerContent={(p) => {
					return <CustomDrawer props={p} userData={data} setProgress={setProgress} />;
				}}
			>
				{
					drawerScreens.map(({ name, Component, options }) => (
						<Drawer.Screen
							key={name}
							name={name}
							options={options}
						>
							{p => <Component {...p} drawerAnimatedStyle={contentStyle} />}
						</Drawer.Screen>
					))
				}
			</Drawer.Navigator>
		</View>
	);
}

export default MyDrawer;

type DrawerScreenConfig = {
	name: string;
	Component: any;
	options?: DrawerNavigationOptions;
}

type CustomDrawerProps = {
	props: DrawerContentComponentProps;
	userData?: UserData;
	setProgress: React.Dispatch<React.SetStateAction<Animated.SharedValue<number>>>;
}

type DrawerItemProps = {
	Icon: React.ReactNode;
	label: string;
	onPress: () => void;
	focused?: boolean;
}