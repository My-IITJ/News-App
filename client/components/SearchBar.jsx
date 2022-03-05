import { StyleSheet, TextInput, View, Keyboard } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { COLORS } from '../constants';
import { useCallback, useRef, useState } from 'react';

const SearchBar = ({ searchInPosts }) => {
	const theme = useTheme();
	const inputRef = useRef();
	const [isFocused, setIsFocused] = useState(inputRef?.current?.isFocused);

	const handleSubmit = useCallback(
		({ nativeEvent: { text } }) => {
			setIsFocused(false);
			searchInPosts(text);
		},
		[searchInPosts]
	);

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.searchBar,
					{
						backgroundColor:
							theme.name === 'dark' ? COLORS.darkgrey : COLORS.white2,
					},
				]}
			>
				{/* search Icon */}
				<Feather
					name="search"
					size={20}
					color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
				/>
				{/* Input field */}
				<TextInput
					ref={inputRef}
					style={[
						styles.input,
						{ color: theme.name === 'dark' ? COLORS.white1 : COLORS.black },
					]}
					placeholder="Search here..."
					placeholderTextColor={
						theme.name === 'dark' ? COLORS.white1 : COLORS.black
					}
					// value={searchPhrase}
					onChangeText={() => {
						// setSearchPhrase(text);
						setIsFocused(true);
					}}
					returnKeyType="search"
					onSubmitEditing={handleSubmit}
				/>
				{/* cross Icon, depending on whether the search bar is clicked or not */}
				{isFocused && (
					<Entypo
						name="cross"
						size={20}
						color={theme.name === 'dark' ? COLORS.white1 : COLORS.black}
						onPress={() => {
							inputRef.current?.clear();
							Keyboard.dismiss();
							setIsFocused(false);
						}}
					/>
				)}
			</View>
		</View>
	);
};

export default SearchBar;

// styles
const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		marginTop: 20,
	},
	searchBar: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
	},
	input: {
		fontSize: 18,
		marginLeft: 10,
		flex: 1,
	},
});
