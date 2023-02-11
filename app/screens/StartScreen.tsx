import React, { FC, useEffect, useState } from 'react'
import { Button, TextInput, View, Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/Navigation.types'
import { StyleSheet, Text } from 'react-native'
import { useReduxDispatch, useReduxSelector } from '../redux'
import {
	addGroupToRedux,
	addScheduleParsToRedux,
	addScheduleToRedux
} from '../redux/counter'
import StorageService from '../Storage/Storage'
import ApiService from '../api/MireaApi'
import { MainRoutes } from '../navigation/Routes'
import { parsSchedule } from '../api/ParserApi'
import { useNetInfo, NetInfoState } from '@react-native-community/netinfo'
import AlertModalService from '../utilities/AlertModal'

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>

const StartScreen: FC<Props> = ({ navigation }) => {
	const [group, setGroup] = useState('') //тут хранится состояние инпут поля
	const dispatch = useReduxDispatch() //запись в хранилище
	const internetState: NetInfoState = useNetInfo() //проверка подключения к интернету

	const setStatrGroup = async () => {
		//тут нужно много проверок и всплыабщие окна
		if (internetState.isConnected === false) {
			AlertModalService.noInternet()
			// Alert.alert(
			// 	'Вы не подключены к интернету.',
			// 	'Для загрузки расписания требуется подключение к интернету',
			// 	[{ text: 'Ок' }]
			// )
		} else {
			try {
				await StorageService.storeData(dispatch, '@currentGroup', group) //сохраняем группу в кэш
				const updateSchedule = await ApiService.full_schedule(group) //получаем расписание
				const mainWeek = await ApiService.current_week() //получаем неделю
				const tmp = parsSchedule(mainWeek, updateSchedule) //парсим json файл расписания
				dispatch(addScheduleParsToRedux(tmp)) //запись расписания в Redux
				navigation.navigate(MainRoutes.Shedule) //переходим на экран с расписанием
			} catch (e) {
				AlertModalService.groupNotFound(group)
				console.log(e)
			}
		}
	}

	return (
		<View>
			<TextInput
				placeholder={'Напиши группу...'}
				onChangeText={setGroup}
				style={{ fontSize: 50 }}
			/>
			<Button title='Далее' onPress={setStatrGroup} />
		</View>
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

export default StartScreen
