// helper function to display all errors neatly
import { useEffect, useRef } from 'react';
import Toast, { DURATION } from 'react-native-easy-toast';
import { COLORS } from '../constants';

export const Error = ({ error }) => {
	const toastRef = useRef();

	console.log(error);

	useEffect(() => {
		toastRef.current.show('error', DURATION.LENGTH_SHORT);
	}, [error]);

	return (
		<Toast
			ref={toastRef}
			style={{
				backgroundColor: 'red',
			}}
			textStyle={{ color: COLORS.white1 }}
		/>
	);
};
