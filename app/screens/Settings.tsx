import React, { FC, useEffect, useState } from 'react'
import { View, Button, TextInput } from 'react-native'
import { useReduxSelector, useReduxDispatch } from '../redux'
import { addAllgroupToRedux, addScheduleParsToRedux } from '../redux/counter'
import StorageService from '../Storage/Storage'
import ApiService from '../api/MireaApi'
import { parsSchedule } from '../api/ParserApi'
import AlertModalService from '../utilities/AlertModal'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
	RootStackParamList,
	SettingsStackParamList
} from '../types/Navigation.types'
import { SelectMireaMap } from '../navigation/MapNavigation'
import { OnlineMap } from '../components/MapMireaOnline'
import { MainRoutes, SettingsRoutes } from '../navigation/Routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import DropDownPicker from 'react-native-dropdown-picker'
import { GroupListParser } from '../api/AllGroupListParser'

type settingsNavProps = NativeStackScreenProps<
	SettingsStackParamList,
	'Settings'
>

const Settings: FC<settingsNavProps> = ({ navigation }) => {
	const nav = useNavigation()
	const [group, setGroup] = useState('')
	const [collorButton, setCollorButto] = useState('green')
	const [open, setOpen] = useState(false)
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	const mainWeek = useReduxSelector(state => state.counter.week)
	const dispatch = useReduxDispatch() //запись в хранилище
	const allGroups = useReduxSelector(state => state.counter.allGroupsList)

	useEffect(() => {
		if (ifOffline || group == '') {
			if (ifOffline == false) {
				getListParser()
			}
			setCollorButto('grey')
		} else {
			setCollorButto('green')
		}
	}, [ifOffline, group])

	const getListParser = async () => {
		dispatch(addAllgroupToRedux(await GroupListParser()))
	}

	const changeGroup = async () => {
		try {
			const updateSchedule = await ApiService.full_schedule(group) //получаем расписание
			await StorageService.storeData(dispatch, '@currentGroup', group) //сохраняем группу в кэш
			const tmp = parsSchedule(mainWeek, updateSchedule) //парсим json файл расписания
			dispatch(addScheduleParsToRedux(tmp)) //запись расписания в Redux
			StorageService.storeScheduleWeekData(
				//тут возможен баг с сохранением не найденной группы
				mainWeek.toString(),
				JSON.stringify(tmp)
			)
			nav.goBack()
			//сделать автоматичекскую навигацию на расписание после удачной смены группы
		} catch (e) {
			AlertModalService.groupNotFound(group)
			console.log(e)
		}
	}

	return (
		<View>
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
				placeholder='Нажми для изменения группы...'
				searchTextInputProps={{
					maxLength: 10
				}}
				searchPlaceholder='Напишите группу в формате: XXXX-00-00'
				style={{
					minHeight: 50,
					paddingVertical: 3
				}}
			/>
			<Button
				title='Далее'
				onPress={() => {
					if (ifOffline) {
						AlertModalService.noInternet()
					} else if (group == '') {
						AlertModalService.groupNotSelect()
					} else {
						changeGroup()
					}
				}}
				color={collorButton}
			/>
			<Button title='Стереть кэш' onPress={StorageService.delData} />
			<Button
				title='Сменить тему'
				onPress={() => navigation.navigate(SettingsRoutes.ChangeTheme)}
			/>
			<Button
				title='Обратная связь'
				onPress={() => navigation.navigate(SettingsRoutes.FeedBack)}
			/>
			<Button
				title='О приложении'
				onPress={() => navigation.navigate(SettingsRoutes.AboutApp)}
			/>
		</View>
	)
}

export default Settings
