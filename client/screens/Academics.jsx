import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { COLORS } from '../constants';
import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import NavBar from '../components/Navbar';
import AcadCard from '../components/AcadCard';

const links = [
	{
		title: 'IITJ website',
		image:
			'https://res.cloudinary.com/myiitj/image/upload/v1668000078/Screenshot_2022-11-09_185007_ybnirh.png',
		link: 'http://iitj.ac.in/',
		desc: 'The official IITJ website. Your one stop shop for all things IITJ.',
	},
	{
		title: 'ERP Portal',
		image:
			'https://res.cloudinary.com/myiitj/image/upload/v1668007608/erp_rjwjuc.jpg',
		link: 'http://220.158.144.41:8080/ERP_IITJ/',
		desc: 'Student academic registration portal.',
	},
	{
		title: 'Library',
		image:
			'https://res.cloudinary.com/myiitj/image/upload/v1668003024/lib_zzz1zg.jpg',
		link: 'https://library.iitj.ac.in/',
		desc: "Explore the world's knowledge @ IIT Jodhpur Library.",
	},
	{
		title: 'Aryabhatta',
		image:
			'https://res.cloudinary.com/myiitj/image/upload/v1668008735/aryabhatta_ny4eul.png',
		link: 'http://14.139.37.243:8080/Aryabhatta_New/',
		desc: 'View your performance record and class reports.',
	},
	{
		title: 'IT Support',
		image:
			'https://res.cloudinary.com/myiitj/image/upload/v1668008689/jira_czuopy.jpg',
		link: 'http://172.16.100.147:8081/servicedesk/customer/user/login?destination=portals',
		desc: 'Resolve any it related issues.',
	},
	{
		title: 'Fee Payment',
		image:
			'https://res.cloudinary.com/myiitj/image/upload/v1668008734/fee_ojnneu.png',
		link: 'https://oa.iitj.ac.in/FeePayment/',
		desc: 'Pay your academic fees, mess and laundry dues here.',
	},
	{
		title: 'SME',
		image:
			'https://res.cloudinary.com/myiitj/image/upload/v1668009271/sme_s27gln.png',
		link: 'https://iitj.ac.in/schools/index.php',
		desc: 'Learn about the School of Management & Entrepreneurship and our MBA programs.',
	},
	{
		title: 'AI&DS',
		image:
			'https://res.cloudinary.com/myiitj/image/upload/v1668009271/aids_rgwfop.jpg',
		link: 'https://aide.iitj.ac.in/',
		desc: 'Learn about the School of Artificial Intelligence and Data Science.',
	},
	{
		title: 'SoLA',
		image:
			'https://res.cloudinary.com/myiitj/image/upload/v1668009271/sola_oiro99.png',
		link: 'https://iitj.ac.in/department/index.php?id=hss',
		desc: 'Learn about the School of Liberal Arts and its programs.',
	},
];

const Academics = ({ drawerAnimatedStyle }) => {
	return (
		<Container style={[drawerAnimatedStyle]}>
			<NavBar />
			<ScrollView
				contentContainerStyle={{
					padding: 20,
				}}
			>
				{links.map((item) => (
					<AcadCard key={item.title} {...item} />
				))}
			</ScrollView>
		</Container>
	);
};

export default Academics;

//styles
const Container = styled(Animated.View)`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;
