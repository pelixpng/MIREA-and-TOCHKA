import React, { FC, useEffect, useState } from 'react'
import { Button, TextInput, View } from 'react-native'
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

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>

const StartScreen: FC<Props> = ({ navigation }) => {
	const [group, setGroup] = useState('')
	const dispatch = useReduxDispatch() //запись в хранилище

	const setStatrGroup = async () => {
		try {
			await StorageService.storeData(dispatch, '@currentGroup', group)
			const updateSchedule = await ApiService.full_schedule(group)

			const mainWeek = await ApiService.current_week()
			const tmp = parsSchedule(mainWeek, updateSchedule)
			dispatch(addScheduleParsToRedux(tmp))

			navigation.navigate(MainRoutes.Shedule)
		} catch (e) {
			console.log(e)
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
