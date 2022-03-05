import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager } from 'react-query';
import { AppState, Platform } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export function useOnlineManager() {
	useEffect(() => {
		if (Platform.OS !== 'web') {
			return NetInfo.addEventListener((state) => {
				onlineManager.setOnline(
					state.isConnected != null &&
						state.isConnected &&
						Boolean(state.isInternetReachable)
				);
			});
		}
	}, []);
}

export function useAppState() {
	function onAppStateChange(status) {
		if (Platform.OS !== 'web') {
			focusManager.setFocused(status === 'active');
		}
	}

	useEffect(() => {
		AppState.addEventListener('change', onAppStateChange);
		return () => {
			AppState.removeEventListener('change', onAppStateChange);
		};
	}, []);
}

export function useRefreshOnFocus(refetch) {
	const enabledRef = useRef(false);

	useFocusEffect(
		useCallback(() => {
			if (enabledRef.current) {
				refetch();
			} else {
				enabledRef.current = true;
			}
		}, [refetch])
	);
}

export function useRefreshByUser(refetch) {
	const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);

	async function refetchByUser() {
		setIsRefetchingByUser(true);

		try {
			await refetch();
		} finally {
			setIsRefetchingByUser(false);
		}
	}

	return {
		isRefetchingByUser,
		refetchByUser,
	};
}
