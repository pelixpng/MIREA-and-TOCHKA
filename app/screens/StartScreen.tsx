import React, { FC, useEffect, useState } from 'react'
import { Button, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/Navigation.types'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { addScheduleParsToRedux, addWeekToRedux } from '../redux/counter'
import StorageService, { Storage } from '../Storage/Storage'
import ApiService from '../api/MireaApi'
import { MainRoutes } from '../navigation/Routes'
import { parsSchedule } from '../api/ParserApi'
import { useNetInfo, NetInfoState } from '@react-native-community/netinfo'
import AlertModalService from '../utilities/AlertModal'
import { StatusBar } from 'expo-status-bar'
import DropDownPicker from 'react-native-dropdown-picker'

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>

const StartScreen: FC<Props> = ({ navigation }) => {
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	const [group, setGroup] = useState('') //тут хранится состояние инпут поля
	const [collorButton, setCollorButto] = useState('green') //тут хранится состояние инпут поля
	const [open, setOpen] = useState(true)
	const dispatch = useReduxDispatch() //запись в хранилище
	const allGroups = useReduxSelector(state => state.counter.allGroupsList)

	//если не было интернета а потом он появился, то потом надо подгрузить все группы попробовать
	useEffect(() => {
		if (ifOffline || group == '') {
			setCollorButto('grey')
		} else {
			setCollorButto('green')
		}
	}, [ifOffline, group])

	const setStatrGroup = async () => {
		try {
			await StorageService.storeData(dispatch, '@currentGroup', group) //сохраняем группу в кэш
			const updateSchedule = await ApiService.full_schedule(group) //получаем расписание
			const mainWeek = await ApiService.current_week() //получаем неделю
			dispatch(addWeekToRedux(mainWeek))
			Storage.set('group', '123')
			const tmp = parsSchedule(mainWeek, updateSchedule) //парсим json файл расписания
			dispatch(addScheduleParsToRedux(tmp)) //запись расписания в Redux
			StorageService.storeScheduleWeekData(
				//тут возможен баг с сохранением не найденной группы
				mainWeek.toString(),
				JSON.stringify(tmp)
			)
			navigation.navigate(MainRoutes.Shedule) //переходим на экран с расписанием
		} catch (e) {
			//надо добавить проверку на причину ошибки
			AlertModalService.groupNotFound(group)
			console.log(e)
		}
	}

	return (
		<View>
			<Button
				title='Далее'
				onPress={() => {
					if (ifOffline) {
						AlertModalService.noInternet()
					} else if (group == '') {
						AlertModalService.groupNotSelect()
					} else {
						setStatrGroup()
					}
				}}
				color={collorButton}
			/>
			<DropDownPicker
				open={open}
				value={group}
				items={allGroups}
				setOpen={setOpen}
				setValue={setGroup}
				searchable={true}
				theme='LIGHT'
				multiple={false}
				mode='BADGE'
				dropDownDirection='AUTO'
				language='RU'
				placeholder='Выбери группу'
				searchTextInputProps={{
					maxLength: 10
				}}
				searchPlaceholder='Напишите группу в формате: XXXX-00-00'
				style={{
					minHeight: 50,
					paddingVertical: 3
				}}
			/>
			<StatusBar style='auto' />
		</View>
	)
}

export default StartScreen
