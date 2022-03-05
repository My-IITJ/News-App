import styled from 'styled-components/native';
import { COLORS } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import InsetShadow from 'react-native-inset-shadow';
import { View } from 'react-native';

const PageIndicators = ({ noOfPages, pageNo, setPageNo }) => {
	const theme = useSelector((s) => s.user.theme);

	const disabled = useCallback(
		(type) => {
			if (type === 'prev') return pageNo === 1;
			if (type === 'next') return pageNo === noOfPages;
		},
		[pageNo, noOfPages]
	);

	const changePage = useCallback(
		(type) => {
			if (type === 'prev') {
				if (pageNo === 1) return;
				setPageNo((p) => p - 1);
			} else {
				if (pageNo === noOfPages) return;
				setPageNo((p) => p + 1);
			}
		},
		[pageNo, noOfPages, setPageNo]
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
							borderRadius: 8,
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
						borderRadius: 8,
						padding: 10,
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
				<Button
					disabled={disabled('prev')}
					style={{ opacity: disabled('prev') ? 0.5 : 1 }}
					onPress={() => changePage('prev')}
				>
					<AntDesign
						name="caretleft"
						size={20}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
				</Button>
				<Button
					disabled={disabled('next')}
					style={{ opacity: disabled('next') ? 0.5 : 1 }}
					onPress={() => changePage('next')}
				>
					<AntDesign
						name="caretright"
						size={20}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
				</Button>
			</Box>
		</Container>
	);
};

export default PageIndicators;

//styles

const Container = styled.View`
	height: 40px;
	width: 70px;
`;

const Button = styled.TouchableOpacity``;
