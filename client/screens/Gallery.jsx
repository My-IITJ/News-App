import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { COLORS } from '../constants';
import Animated from 'react-native-reanimated';
import ImageView from "react-native-image-viewing";
import NavBar from '../components/Navbar';
import {View, Text} from 'react-native';

const Interact = ({ navigation, drawerAnimatedStyle }) => {


useEffect(({navigation}) => {
  navigation.navigate('Tmp');
})
    
    const images = [
        {
          uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
          uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
          uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
        },
      ];

      const [visible, setIsVisible] = useState(false);
	return (
    <>
		<Container style={[drawerAnimatedStyle]}>
			{/* <NavBar/> */}
      {/* <View>
        <Text>
          Hey
        </Text>
      </View> */}
			<ImageView
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
		</Container>
    </>
	);
};

export default Interact;

//styles
const Container = styled(Animated.View)`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;





