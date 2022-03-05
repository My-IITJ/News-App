import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import InsetShadow from 'react-native-inset-shadow';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { toggleTheme } from '../redux/userSlice';
import { View } from 'react-native';

const ThemeBtn = () => {
	const theme = useSelector((s) => s.user.theme);
	const dispatch = useDispatch();

	const updateTheme = useCallback(
		(type) => {
			dispatch(toggleTheme({ type }));
		},
		[dispatch]
	);

	const Box = useCallback(
		({ children }) => {
			if (theme.name === 'light') {
				return (
					<InsetShadow
						containerStyle={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: theme.backgroundColor3,
							borderRadius: 60,
							padding: 4,
						}}
						shadowOpacity={0.8}
						shadowOffset={2}
						shadowRadius={10}
						elevation={10}
					>
						{children}
					</InsetShadow>
				);
			}

			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: theme.backgroundColor3,
						borderRadius: 60,
						padding: 4,
					}}
				>
					{children}
				</View>
			);
		},
		[theme]
	);

	return (
		<Container>
			<Box>
				<Wrapper
					onPress={() => updateTheme('light')}
					selected={theme.name === 'light'}
				>
					<Ionicons
						name="ios-sunny"
						size={24}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
				</Wrapper>

				<Wrapper
					onPress={() => updateTheme('dark')}
					selected={theme.name === 'dark'}
				>
					<Ionicons
						name="moon"
						size={24}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
				</Wrapper>
			</Box>
		</Container>
	);
};

export default ThemeBtn;

// styles
const background = (name) => {
	return name === 'dark' ? COLORS.darkgrey : COLORS.gray20;
};

const Container = styled.View`
	flex-direction: row;
	margin-left: auto;
	margin-right: 20px;
	margin-bottom: 8px;
`;

const Wrapper = styled.TouchableOpacity`
	width: 30px;
	border-radius: 60px;
	margin: 0 4px;
	align-items: center;
	justify-content: center;
	background-color: ${(p) =>
		p.selected ? background(p.theme.name) : COLORS.transparent};
	border: ${(p) => (p.selected ? `1px solid ${COLORS.black}` : 'none')};
`;
