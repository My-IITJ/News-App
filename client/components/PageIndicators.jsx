import styled from 'styled-components/native';
import { COLORS } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

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

	return (
		<Container>
			<Box>
				<Button
					disabled={disabled('prev')}
					style={{ opacity: disabled('prev') ? 0.5 : 1 }}
					onPress={() => changePage('prev')}
				>
					<AntDesign
						name="left"
						size={25}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
					/>
				</Button>
				<Button
					disabled={disabled('next')}
					style={{ opacity: disabled('next') ? 0.5 : 1 }}
					onPress={() => changePage('next')}
				>
					<AntDesign
						name="right"
						size={25}
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

const Box = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 8px;
`;
