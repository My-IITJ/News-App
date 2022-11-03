import React, { useState } from "react";
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import Constants from 'expo-constants';
 
 
 import { architecture } from "../data/architecture";
import { COLORS } from "../constants";
import NavBar from "../components/Navbar";
import ImageFolder from "./GalleryView/ImageFolder";
import { FlatList } from "react-native-gesture-handler";
import { city } from "../data/city";
import { food } from "../data/food";
import { Text } from "react-native-paper";
import GalleryView from "./GalleryView";

 
 export default function Interact({drawerAnimatedStyle, navigation}) {
  const [isImageFolderOpen, setIsImageFolderOpen] = useState(false);
   const images = [
    {"id": 1, "title": "Architecture", "images": architecture},
    {"id": 2, "title": "City", "images": city},
    {"id": 3, "title": "Food", "images": food},
   ]

   const openImageFolder = ({item}) => {
    setIsImageFolderOpen((prev) => !prev);
   }
 
   return (
     <Container style={[drawerAnimatedStyle]}>
      <NavBar/>
      <GalleryView/>
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