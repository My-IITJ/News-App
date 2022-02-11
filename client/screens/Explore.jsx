import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import SearchBar from "../components/SearchBar";

const Explore = () => {
	const [searchPhrase, setSearchPhrase] = useState("");
	const [clicked, setClicked] = useState(false);
	return (
		<SafeAreaView style={styles.root}>
			<SearchBar
				searchPhrase={searchPhrase}
				setSearchPhrase={setSearchPhrase}
				clicked={clicked}
				setClicked={setClicked}
			/>
		</SafeAreaView>
	);
};

export default Explore;

//styles
const styles = StyleSheet.create({
	root: {
		justifyContent: "center",
		alignItems: "center",
	},
});
