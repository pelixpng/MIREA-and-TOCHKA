import 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Navigation } from './app/navigation/Navigation'
import React, { useState, useEffect } from 'react'
import { useReduxDispatch } from './app/redux'
import {
	addGroupToRedux,
	addWeekToRedux,
	addScheduleParsToRedux,
	addAllgroupToRedux,
	addIsAppOfflineToRedux
} from './app/redux/counter'
import ApiService from './app/api/MireaApi'
import { parsSchedule } from './app/api/ParserApi'
import StorageService from './app/Storage/Storage'
import { StatusBar } from 'expo-status-bar'
import { GroupListParser } from './app/api/AllGroupListParser'
import * as SplashScreen from 'expo-splash-screen'

//ПЕРЕЙТИ НА НОРМ ХРАНИЛИЩЕ когда будет готов дизайн

SplashScreen.preventAutoHideAsync()
export function RootApp() {
	const [isAppLoading, setIsAppLoading] = useState(false) // статус загрузки приложения
	const [isAuth, setIsAuth] = useState(false) // тип страницы при запуске
	const dispatch = useReduxDispatch() // для записи в Redux
	useEffect(() => {
		getInitialRoute() // функция для загрузки приложения (расписания и выбор стартового экрана)
	}, [])

	const getInitialRoute = async () => {
		const nameGroup = await AsyncStorage.getItem('@currentGroup') // загружаем имя ранее выбранную группы из кэша
		try {
			if (nameGroup !== null) {
				const currentWeek = await ApiService.current_week()
				dispatch(addWeekToRedux(currentWeek))
				const updateSchedule = await ApiService.full_schedule(nameGroup) // загружаем актуальное расписание
				const tmp = parsSchedule(currentWeek, updateSchedule) // распарсим расписание на неделю из json файла
				dispatch(addScheduleParsToRedux(tmp)) // добавляем все в Redux
				dispatch(addGroupToRedux(nameGroup))
				StorageService.storeScheduleWeekData(
					currentWeek.toString(),
					JSON.stringify(tmp)
				)
				dispatch(addAllgroupToRedux(await GroupListParser()))
				return setIsAuth(true) // указываем что группа выбрана и можно переходить к просмотру расписания
			} else {
				dispatch(addAllgroupToRedux(await GroupListParser()))
			}
		} catch (e) {
			console.log(e)
			if (nameGroup !== null) {
				const cachedWeek = await AsyncStorage.getItem('weekKey')
				const cachedSchedule = await AsyncStorage.getItem('scheduleCache')
				dispatch(addGroupToRedux(nameGroup))
				dispatch(addWeekToRedux(Number(cachedWeek)))
				if (cachedSchedule !== null) {
					dispatch(addScheduleParsToRedux(JSON.parse(cachedSchedule)))
				}
				dispatch(addIsAppOfflineToRedux(true))
				setIsAuth(true)
			}
		} finally {
			setIsAppLoading(true) // указываем что приложение загрузилось
			await SplashScreen.hideAsync()
		}
	}

	if (!isAppLoading) {
		return null
		// return (
		// 	<View style={styles.container}>
		// 		<Text>ЭКРАН ЗАГРУЗКИ</Text>
		// 		<StatusBar style='auto' />
		// 	</View>
		// )
	}

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
