import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import React from "react";

const SearchBar = (props) => {
	return (
		<View style={styles.container}>
			<View
				style={
					!props.clicked
						? styles.searchBar__unclicked
						: styles.searchBar__clicked
				}
			>
				{/* search Icon */}
				<Feather
					name="search"
					size={20}
					color="black"
					style={{ marginLeft: 1 }}
				/>
				{/* Input field */}
				<TextInput
					style={styles.input}
					placeholder="Search here..."
					value={props.searchPhrase}
					onChangeText={props.setSearchPhrase}
					onFocus={() => {
						props.setClicked(true);
					}}
				/>
				{/* cross Icon, depending on whether the search bar is clicked or not */}
				{props.clicked && (
					<Entypo
						name="cross"
						size={20}
						color="black"
						style={{ padding: 1 }}
						onPress={() => {
							props.setSearchPhrase("");
						}}
					/>
				)}
			</View>
			{/* cancel button, depending on whether the search bar is clicked or not */}
			{props.clicked && (
				<View>
					<Button
						size="sm"
						color="#F5F6FA"
						variant="ghost"
						title="Cancel"
						onPress={() => {
							Keyboard.dismiss();
							props.setClicked(false);
						}}
					></Button>
				</View>
			)}
		</View>
	);
};

export default SearchBar;

// styles
const styles = StyleSheet.create({
	container: {
		margin: 15,
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		width: "90%",
	},
	searchBar__unclicked: {
		padding: 10,
		flexDirection: "row",
		width: "95%",
		backgroundColor: "#F5F6FA",
		borderRadius: 30,
		alignItems: "center",
	},
	searchBar__clicked: {
		padding: 10,
		flexDirection: "row",
		width: "80%",
		backgroundColor: "#F5F6FA",
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	input: {
		fontSize: 20,
		marginLeft: 10,
		width: "90%",
	},
});
