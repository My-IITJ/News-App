import React, { useState } from "react";
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import Constants from 'expo-constants';
import { Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import NavBar from "../components/Navbar";
import { COLORS } from "../constants";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { fests } from "../data/events";


export default function Events({drawerAnimatedStyle, navigation}) {
    return (
       <Container style={[drawerAnimatedStyle]}>
        <NavBar/>
        <FlatList
            data = {fests}
            keyExtractor={(item, index) => item.name}
            renderItem = {({item}) => (
                <TouchableOpacity onPress={() => navigation.push('Galleryfinal', item)} style={{padding:10}}>
                  {/* <Text style={styles.name}>
                    {item.name}
                  </Text> */}
                    <Card>
                        <Card.Cover source={{ uri: item.thumbnail }} />
                        <Card.Content>
                          <Title>{item.name}</Title>
                          <Paragraph>{item.desc}</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            )}
        />
       </Container>
     );
   }

const Container = styled(Animated.View)`
   flex: 1;
   background-color: ${({ theme }) =>
       theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1};
   padding-top: ${Constants.statusBarHeight}px;
`;