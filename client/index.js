import 'expo-dev-client';
import { registerRootComponent } from 'expo';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const MyApp = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

registerRootComponent(MyApp);
