import React, { useState } from "react";
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import Constants from 'expo-constants';
 
import { COLORS } from "../constants";
import GalleryView from "./GalleryView";
import { useSelector } from "react-redux";

 
 export default function Interact({drawerAnimatedStyle, navigation, route}) {
  const {theme} = useSelector(s => s.user);
 
   return (
     <Container style={[drawerAnimatedStyle]}>
      {/* <NavBar/> */}
      <GalleryView theme={theme} item={route.params}/>
     </Container>
   );
 }
 
//styles
const Container = styled(Animated.View)`
	flex: 1;
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
	padding-top: ${Constants.statusBarHeight}px;
`;