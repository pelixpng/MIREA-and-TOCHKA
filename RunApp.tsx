import 'react-native-gesture-handler'
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
import { GroupListParser } from './app/api/AllGroupListParser'
import * as SplashScreen from 'expo-splash-screen'
import StorageServiceMMKV, { Storage } from './app/Storage/Storage'

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
		const nameGroup = Storage.getString('group')
		try {
			if (nameGroup !== undefined) {
				const currentWeek = await ApiService.current_week()
				dispatch(addWeekToRedux(currentWeek))
				const updateSchedule = await ApiService.full_schedule(nameGroup) // загружаем актуальное расписание
				const tmp = parsSchedule(currentWeek, updateSchedule) // распарсим расписание на неделю из json файла
				dispatch(addScheduleParsToRedux(tmp)) // добавляем все в Redux
				dispatch(addGroupToRedux(nameGroup))
				StorageServiceMMKV.saveSchedule(
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
			if (nameGroup !== undefined) {
				const cachedWeek = Storage.getString('week')
				const cachedSchedule = Storage.getString('schedule')
				dispatch(addGroupToRedux(nameGroup))
				dispatch(addWeekToRedux(Number(cachedWeek)))
				if (cachedSchedule !== undefined) {
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
	}

	return <Navigation isAuth={isAuth} /> // передаем данные для навигации
}
