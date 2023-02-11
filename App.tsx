import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store, { useReduxDispatch } from './app/redux'
import { RootApp } from './RunApp'

export default function App() {
	return (
		//провайдер для доступа всех компонентов к хранилищу Redux
		<Provider store={store}>
			<RootApp />
		</Provider>
	)
}
