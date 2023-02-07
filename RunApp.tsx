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
import {
	addGroupToRedux,
	addWeekToRedux,
	addScheduleToRedux,
	addScheduleParsToRedux
} from './app/redux/counter'
import ApiService from './app/api/MireaApi'
import { parsSchedule } from './app/api/ParserApi'
//import { current_week } from './app/api/MireaApi'

export function RootApp() {
	const [isAppLoading, setIsAppLoading] = useState(false)
	const [isAuth, setIsAuth] = useState(false)
	const dispatch = useReduxDispatch() //запись в хранилище
	useEffect(() => {
		getInitialRoute()
	}, [])

	const getInitialRoute = async () => {
		try {
			const currentWeek = await ApiService.current_week()
			dispatch(addWeekToRedux(currentWeek))
			const cachedGroup = await AsyncStorage.getItem('@currentGroup')
			if (cachedGroup !== null) {
				const updateSchedule = await ApiService.full_schedule(cachedGroup)
				const tmp = parsSchedule(currentWeek, updateSchedule)
				dispatch(addScheduleParsToRedux(tmp))
				dispatch(addGroupToRedux(cachedGroup))
				return setIsAuth(true)
			}
		} catch (e) {
			console.log(e)
		} finally {
			setIsAppLoading(true)
		}
	}

	if (!isAppLoading) return <View style={styles.container} />

	return <Navigation isAuth={isAuth} />
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
