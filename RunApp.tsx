import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Settings from './app/screens/Settings'
import StartScreen from './app/screens/StartScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Navigation } from './app/navigation/Navigation'
import { useState, useEffect } from 'react'
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
// import { current_week } from './app/api/MireaApi'

export function RootApp() {
	const [isAppLoading, setIsAppLoading] = useState(false) // статус загрузки приложения
	const [isAuth, setIsAuth] = useState(false) // тип страницы при запуске
	const dispatch = useReduxDispatch() // для записи в Redux
	useEffect(() => {
		getInitialRoute() // функция для загрузки приложения (расписания и выбор стартового экрана)
	}, [])

	const getInitialRoute = async () => {
		try {
			//asyncThunk
			const currentWeek = await ApiService.current_week() // получаем учебную неделю
			dispatch(addWeekToRedux(currentWeek)) // записываем учебную неделю в Redux
			const nameGroup = await AsyncStorage.getItem('@currentGroup') // загружаем имя ранее выбранную группы из кэша
			if (nameGroup !== null) {
				//asyncThunk
				const updateSchedule = await ApiService.full_schedule(nameGroup) // загружаем актуальное расписание
				const tmp = parsSchedule(currentWeek, updateSchedule) // распарсим расписание на неделю из json файла
				dispatch(addScheduleParsToRedux(tmp)) // добавляем все в Redux
				dispatch(addGroupToRedux(nameGroup))
				// await AsyncStorage.setItem('@cachedSchedule', updateSchedule.toString()) //спорная вещь...
				return setIsAuth(true) // указываем что группа выбрана и можно переходить к просмотру расписания
			}
		} catch (e) {
			console.log(e)
		} finally {
			setIsAppLoading(true) // указываем что приложение загрузилось
		}
	}

	if (!isAppLoading) return <View style={styles.container} />

	return <Navigation isAuth={isAuth} /> // передаем данные для навигации
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
