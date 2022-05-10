import styled, { useTheme } from 'styled-components/native';
import { COLORS, icons, SIZES } from '../constants';
import Icon from './Icon';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const NavBar = ({ profile }) => {
	const theme = useTheme();
	const navigation = useNavigation();
	const data = useSelector((s) => s.user.data);

	return (
		<Container>
			<Icon src={icons.logo_home} width={48} height={48} />
			<Title>My IITJ</Title>
			<AddBtn onPress={() => navigation.navigate('NewPost')}>
				<Ionicons
					name="add"
					size={26}
					color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
				/>
			</AddBtn>
			<TouchableOpacity
				onPress={() =>
					!profile && navigation.navigate('Profile', { _id: data?._id })
				}
			>
				<Icon
					src={{ uri: data?.profileImg }}
					width={45}
					height={45}
					radius={10}
				/>
			</TouchableOpacity>
		</Container>
	);
};

export default NavBar;

//styles
const Container = styled.View`
	padding: 10px 20px;
	flex-direction: row;
	align-items: center;
`;

const Title = styled.Text`
	font-size: 25px;
	margin-left: 10px;
	margin-right: auto;
	font-weight: bold;
	letter-spacing: 1.2px;
	font-family: Poppins_400Regular;
	color: ${(p) => (p.theme.name === 'dark' ? COLORS.white1 : COLORS.black)};
`;

const AddBtn = styled.TouchableOpacity`
	border: ${(p) =>
		`2px solid ${p.theme.name === 'dark' ? COLORS.white1 : COLORS.black}`};
	border-radius: ${SIZES.radius}px;
	padding: 3px;
	margin-right: 15px;
`;
