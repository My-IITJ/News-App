import { useCallback, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { COLORS, SIZES } from '../constants';
import BlurModal from './BlurModal';

const tags = [
	{
		id: 1,
		name: 'Project',
	},
	{
		id: 2,
		name: 'Research',
	},
	{
		id: 3,
		name: 'Academics',
	},
	{
		id: 4,
		name: 'Medical',
	},
];

const InterestedTags = ({ open, setOpen }) => {
	const [selectedTags, setSelectedTags] = useState([]);

	const toggleSelection = useCallback(
		(name) => {
			const idx = selectedTags.indexOf(name);
			if (idx !== -1) {
				selectedTags.splice(idx, 1);
				setSelectedTags(selectedTags);
				return;
			}
			setSelectedTags((p) => [...p, name]);
		},
		[selectedTags]
	);

	return (
		<BlurModal visible={open} toggleModal={() => setOpen((p) => !p)}>
			<Box>
				<Title>{'Tell us your interests...'}</Title>

				<Tags>
					{tags.map((tag) => {
						return (
							<View key={tag.id}>
								<Tag
									onPress={() => toggleSelection(tag.name)}
									selected={selectedTags.includes(tag.name)}
								>
									<Label>{tag.name}</Label>
								</Tag>
							</View>
						);
					})}
				</Tags>
			</Box>
		</BlurModal>
	);
};

export default InterestedTags;

const getStroke = (name) => {
	return name === 'dark' ? '3px solid #F675FF' : '3px solid #5685ff';
};

// styles
const Box = styled.View`
	width: 75%;
	min-height: 120px;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.deepBlue2 : COLORS.deepBlue};
	border-radius: ${SIZES.radius}px;
	padding: 20px;
`;

const Title = styled.Text`
	font-size: 24px;
	font-family: Poppins_400Regular;
	color: ${(p) => COLORS.white1};
	font-weight: 700;
	letter-spacing: 1.5px;
`;

const Tags = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-around;
	margin: 20px 0;
`;

const Tag = styled.TouchableOpacity`
	border-radius: ${SIZES.radius}px;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.purple : COLORS.white1};
	padding: 8px;
	margin: 8px 0px;
	margin-right: 10px;
	border: ${(p) => (p.selected ? getStroke(p.theme.name) : 'none')};
`;

const Label = styled.Text`
	font-size: 14px;
	font-family: Poppins_400Regular;
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.black)};
	letter-spacing: 1.5px;
`;
