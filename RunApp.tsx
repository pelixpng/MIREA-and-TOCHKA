import 'react-native-gesture-handler'
import { Navigation } from './app/navigation/Navigation'
import React, { useState, useEffect, useMemo } from 'react'
import { useReduxDispatch, useReduxSelector } from './app/redux'
import {
	addGroupToRedux,
	addWeekToRedux,
	addScheduleParsToRedux,
	addAllgroupToRedux,
	addIsAppOfflineToRedux,
	addThemeToRedux,
	addThemeSettingsToRedux
} from './app/redux/counter'
import ApiService from './app/api/MireaApi'
import { parsSchedule } from './app/api/ParserApi'
import * as SplashScreen from 'expo-splash-screen'
import StorageServiceMMKV, { Storage } from './app/storage/Storage'
import { DarkTheme, LightTheme } from './app/components/Themes'
import { DefaultTheme, ThemeProvider, useTheme } from 'styled-components/native'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'

SplashScreen.preventAutoHideAsync()
export function RootApp() {
	const colorScheme = useColorScheme()
	const [isAppLoading, setIsAppLoading] = useState(false) // статус загрузки приложения
	const [isAuth, setIsAuth] = useState(false) // тип страницы при запуске
	const dispatch = useReduxDispatch() // для записи в Redux
	const theme = useReduxSelector(state => state.counter.theme)
	const themeSettingss = useReduxSelector(state => state.counter.themeSettings)

	useEffect(() => {
		getInitialRoute() // функция для загрузки приложения (расписания и выбор стартового экрана)
	}, [])

	const getColorScheme = () => {
		const themeSettings = Storage.getString('theme')
		if (themeSettings == 'Тёмная') {
			dispatch(addThemeSettingsToRedux(themeSettings))
			dispatch(addThemeToRedux('dark'))
		} else if (themeSettings == 'Светлая') {
			dispatch(addThemeSettingsToRedux(themeSettings))
			dispatch(addThemeToRedux('light'))
		} else {
			dispatch(addThemeSettingsToRedux('Системная'))
			if (colorScheme != null && colorScheme != undefined) {
				dispatch(addThemeToRedux(colorScheme))
			} else {
				dispatch(addThemeToRedux('light'))
			}
		}
	}

	const getTheme = (theme: string) => {
		if (theme == 'light') {
			return LightTheme
		} else {
			return DarkTheme
		}
	}

	const getInitialRoute = async () => {
		getColorScheme()
		const nameGroup = Storage.getString('group')
		try {
			if (nameGroup !== undefined) {
				const currentWeek = await ApiService.getCurrentWeek()
				dispatch(addWeekToRedux(currentWeek))
				const updateSchedule = await ApiService.getFullSchedule(nameGroup) // загружаем актуальное расписание
				const tmp = parsSchedule(currentWeek, updateSchedule) // распарсим расписание на неделю из json файла
				dispatch(addScheduleParsToRedux(tmp)) // добавляем все в Redux
				dispatch(addGroupToRedux(nameGroup))
				StorageServiceMMKV.saveSchedule(
					currentWeek.toString(),
					JSON.stringify(tmp)
				)

				dispatch(addAllgroupToRedux(await ApiService.getAllGroups()))
				return setIsAuth(true) // указываем что группа выбрана и можно переходить к просмотру расписания
			} else {
				dispatch(addAllgroupToRedux(await ApiService.getAllGroups()))
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

	return (
		<ThemeProvider
			theme={
				themeSettingss == 'Системная' ? getTheme(colorScheme) : getTheme(theme)
			}
		>
			<StatusBar
				style={
					themeSettingss == 'Системная'
						? getTheme(colorScheme).colors.statusBarText
						: getTheme(theme).colors.statusBarText
				}
				backgroundColor={
					themeSettingss == 'Системная'
						? getTheme(colorScheme).colors.backgroundApp
						: getTheme(theme).colors.backgroundApp
				}
			/>
			<Navigation isAuth={isAuth} />
		</ThemeProvider>
	) // передаем данные для навигации
}
