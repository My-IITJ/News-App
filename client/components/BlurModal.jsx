import { Modal, StyleSheet } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';
import { LinearGradient } from 'expo-linear-gradient';

const BlurModal = ({ visible, children, toggleModal }) => {
	const theme = useTheme();
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				toggleModal();
			}}
		>
			<BlurView
				style={StyleSheet.absoluteFillObject}
				blurType="light"
				blurAmount={10}
				reducedTransparencyFallbackColor="white"
			/>
			{theme.name === 'dark' && (
				<LinearGradient
					colors={['rgba(14,11,58,0.88)', 'rgba(14,11,58,0.5)']}
					start={{ x: 0, y: 1 }}
					end={{ x: 1, y: 0 }}
					style={StyleSheet.absoluteFillObject}
				/>
			)}
			<Container>{children}</Container>
		</Modal>
	);
};

export default BlurModal;

// styles
const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
