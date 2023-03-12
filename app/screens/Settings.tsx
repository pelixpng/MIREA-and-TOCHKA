import React, { FC, useEffect, useState } from 'react'
import { View, Button, TextInput } from 'react-native'
import { useReduxSelector, useReduxDispatch } from '../redux'
import { addAllgroupToRedux, addScheduleParsToRedux } from '../redux/counter'
import StorageService, { Storage } from '../Storage/Storage'
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
import { SettingsButton } from '../components/ui/settings/ButtonSettings'
import styled from 'styled-components/native'

type settingsNavProps = NativeStackScreenProps<
	SettingsStackParamList,
	'Settings'
>

const Settings: FC<settingsNavProps> = ({ navigation, route }) => {
	const nav = useNavigation()
	const [group, setGroup] = useState('')
	const [collorButton, setCollorButto] = useState('green')
	const [open, setOpen] = useState(false)
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	const mainWeek = useReduxSelector(state => state.counter.week)
	const dispatch = useReduxDispatch() //запись в хранилище
	const allGroups = useReduxSelector(state => state.counter.allGroupsList)
	const nameButton: string[] = [
		'Сменить тему',
		'Обратная связь',
		'О приложении'
	]
	type routeNameType = 'AboutApp' | 'ChangeTheme' | 'FeedBack' | 'Settings'
	const routes: routeNameType[] = ['ChangeTheme', 'FeedBack', 'AboutApp']
	const groupMMKV = Storage.getString('group')
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

	const ChangeGroupButton: FC = () => {
		return (
			<ButtonContainer
				testID={
					ifOffline ? 'rgba(172, 172, 172, 0.2)' : 'rgba(0, 255, 144, 0.2)'
				}
				onPress={() => {
					if (ifOffline) {
						AlertModalService.noInternet()
					} else {
						changeGroup()
						setGroup('')
					}
				}}
			>
				<Title>Сменить группу {groupMMKV}</Title>
			</ButtonContainer>
		)
	}

	return (
		<View style={{ backgroundColor: '#e9e9e9', height: '100%' }}>
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
					marginTop: 10,
					minHeight: 50,
					paddingVertical: 3,
					borderRadius: 20,
					borderColor: 'white'
					// width: '97%',
					// alignSelf: 'center'
				}}
				containerStyle={{
					width: '97%',
					alignSelf: 'center'
					//borderColor: 'white'
				}}
				dropDownContainerStyle={{ borderColor: 'white', borderRadius: 20 }}
			/>

			{group != '' ? <ChangeGroupButton /> : null}
			{/* <Button
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
			/> */}
			<Button title='Стереть кэш' onPress={StorageService.delData} />
			{open == false
				? nameButton.map((name, index) => (
						<SettingsButton
							navigation={navigation}
							route={route}
							name={name}
							routeName={routes[index]}
						/>
				  ))
				: null}
		</View>
	)
}

const ButtonContainer = styled.TouchableOpacity`
	padding: 10px;
	border-radius: 20px;
	background-color: ${props => props.testID};
	margin-top: 20px;
	width: 97%;
	align-self: center;
	align-items: center;
`
const Title = styled.Text`
	width: auto;
	height: auto;
	font-weight: 600;
	font-size: 20px;
	//line-height: 23px;
	color: rgba(33, 37, 37, 0.83);
`

export default Settings
