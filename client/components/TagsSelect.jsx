import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { COLORS, isSmall, SIZES } from '../constants';

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
	{
		id: 5,
		name: 'Hostel',
	},
	{
		id: 6,
		name: 'Dining',
	},
];

const TagsFilter = ({ selectedTags, open, toggleModal, toggleSelection }) => {
	return (
		<Container>
			<Modal
				animationType="slide"
				transparent={true}
				visible={open}
				onRequestClose={toggleModal}
			>
				<FilterModal>
					<Title>Tags</Title>
					<Tags>
						{tags.map((tag) => {
							return (
								<Tag
									key={tag.id}
									onPress={() => toggleSelection(tag.name)}
									selected={selectedTags.includes(tag.name)}
								>
									<Label size={isSmall && 12}>{tag.name}</Label>
								</Tag>
							);
						})}
					</Tags>
					<Button
						onPress={() => {
							toggleModal();
						}}
					>
						<Label size={isSmall ? 16 : 20}>Done</Label>
					</Button>
				</FilterModal>
			</Modal>
		</Container>
	);
};

export default TagsFilter;

// styles

const getStroke = (name) => {
	return name === 'dark' ? '3px solid #F675FF' : '3px solid #5685ff';
};

const Container = styled.View`
	flex: 1;
	padding: 10px;
	flex-direction: row-reverse;
`;

const Title = styled.Text`
	font-family: Poppins_400Regular;
	font-size: ${isSmall ? 18 : 20}px;
	letter-spacing: 1.5px;
	color: ${COLORS.white1};
`;

const FilterModal = styled.View`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.darkPurple : COLORS.deepBlue};
	min-height: ${isSmall ? 20 : 30}%;
	border: ${(p) =>
		p.theme.name === 'dark'
			? `1px solid ${COLORS.white1}`
			: `0px solid ${COLORS.transparent}`};
	margin-top: auto;
	border-top-left-radius: ${SIZES.padding}px;
	border-top-right-radius: ${SIZES.padding}px;
	padding: 20px;
`;

const Tags = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	margin: ${isSmall ? 10 : 20}px 0;
`;

const Tag = styled.TouchableOpacity`
	border-radius: ${SIZES.radius}px;
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.purple : COLORS.white1};
	padding: 8px;
	margin: 8px 0px;
	margin-right: 10px;
	border: ${(p) =>
		p.selected ? getStroke(p.theme.name) : '3px solid transparent'};
`;

const Label = styled.Text`
	font-size: ${(p) => p.size || 14}px;
	font-family: Poppins_400Regular;
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.black)};
	letter-spacing: 1.5px;
`;

const Button = styled.TouchableOpacity`
	background-color: ${(p) =>
		p.theme.name === 'dark' ? COLORS.black1 : COLORS.white1};
	align-items: center;
	border-radius: 14px;
	margin: 10px auto;
	padding: 10px;
	width: 30%;
`;
