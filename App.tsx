import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Shedule from './app/screens/Shedule'
import Settings from './app/screens/Settings'
import StartScreen from './app/screens/StartScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Navigation } from './app/navigation/Navigation'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import store, { useReduxDispatch } from './app/redux'
import { addGroupToRedux } from './app/redux/counter'
// const action: object = {
// 	type: '',
// 	payload: '?'
// }

// const defaultState = {
// 	group: 'No Group'
// }

// function reducer(
// 	state: { group: string } = defaultState,
// 	action: { type: string; payload: string }
// ) {
// 	switch (action.type) {
// 		case 'ADD_GROUP':
// 			return { ...state, obj: (state.group = action.payload) }
// 			break
// 		default:
// 			return state
// 	}
// }
// const store = createStore(reducer)
// 	const dispatch = useDispatch()
// 	const reduxGroup = store.getState().group

export default function App() {
	const [isAppLoading, setIsAppLoading] = useState(false)
	const [isAuth, setIsAuth] = useState(false)
	//const dispatch = useReduxDispatch() //запись в хранилище
	useEffect(() => {
		getInitialRoute()
	}, [])

	const getInitialRoute = async () => {
		try {
			//console.log(reduxGroup)
			const cachedGroup = await AsyncStorage.getItem('@currentGroup')
			if (cachedGroup !== null) {
				//dispatch(addGroupToRedux(cachedGroup))
				return setIsAuth(true)
			}
		} catch (e) {
			console.log(e)
		} finally {
			setIsAppLoading(true)
		}
	}

	if (!isAppLoading) return <View style={styles.container} />

	return (
		<Provider store={store}>
			<Navigation isAuth={isAuth} />
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
