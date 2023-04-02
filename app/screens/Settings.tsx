import React, { FC, useEffect, useState } from 'react'
import { useReduxSelector, useReduxDispatch } from '../redux'
import { addAllgroupToRedux, addScheduleParsToRedux } from '../redux/counter'
import ApiService from '../api/MireaApi'
import { parsSchedule } from '../api/ParserApi'
import AlertModalService from '../utilities/AlertModal'
import { useNavigation } from '@react-navigation/native'
import { SettingsStackParamList } from '../types/Navigation.types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import DropDownPicker from 'react-native-dropdown-picker'
import { SettingsButton } from '../components/ui/settings/ButtonSettings'
import StorageServiceMMKV from '../storage/Storage'
import {
	BackgroundContainer,
	MainButton,
	MainButtonTitle
} from '../components/UniversalComponents'
import { useColorScheme } from 'react-native'

type settingsNavProps = NativeStackScreenProps<
	SettingsStackParamList,
	'Settings'
>

const Settings: FC<settingsNavProps> = ({ navigation, route }) => {
	const nav = useNavigation()
	const [group, setGroup] = useState('')
	const [open, setOpen] = useState(false)
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	const mainWeek = useReduxSelector(state => state.counter.week)
	const dispatch = useReduxDispatch() //запись в хранилище
	const allGroups = useReduxSelector(state => state.counter.allGroupsList)
	const nameButton: string[] = [
		'Обратная связь',
		'О приложении',
		'Сменить тему'
	]
	type routeNameType = 'AboutApp' | 'FeedBack' | 'Settings' | 'ChangeTheme'
	const routes: routeNameType[] = ['FeedBack', 'AboutApp', 'ChangeTheme']

	useEffect(() => {
		if (ifOffline || group == '') {
			if (ifOffline == false) {
				getListParser()
			}
		}
	}, [ifOffline, group])

	const getListParser = async () => {
		dispatch(addAllgroupToRedux(await ApiService.getAllGroups()))
	}

	const changeGroup = async () => {
		try {
			const updateSchedule = await ApiService.getFullSchedule(group) //получаем расписание
			StorageServiceMMKV.saveGroup(group, dispatch)
			const tmp = parsSchedule(mainWeek, updateSchedule) //парсим json файл расписания
			dispatch(addScheduleParsToRedux(tmp)) //запись расписания в Redux
			StorageServiceMMKV.saveSchedule(mainWeek.toString(), JSON.stringify(tmp))
			nav.goBack()
		} catch (e) {
			AlertModalService.groupNotFound(group)
			console.log(e)
		}
	}

	const ChangeGroupButton: FC = () => {
		return (
			<MainButton
				bg={ifOffline ? 'rgba(172, 172, 172, 0.2)' : 'rgba(0, 255, 144, 0.2)'}
				onPress={() => {
					if (ifOffline) {
						AlertModalService.noInternet()
					} else {
						changeGroup()
						setGroup('')
					}
				}}
			>
				<MainButtonTitle>Сменить группу </MainButtonTitle>
			</MainButton>
		)
	}

	return (
		<BackgroundContainer height='100%'>
			{/* <Button title='Стереть кэш' onPress={() => Storage.clearAll()} /> */}
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
				placeholder='Нажмите для смены группы...'
				searchPlaceholderTextColor='rgba(128, 128, 128, 0.83)'
				searchTextInputProps={{
					maxLength: 10
				}}
				searchPlaceholder='Напишите группу...'
				style={{
					marginTop: 10,
					minHeight: 50,
					paddingVertical: 3,
					borderRadius: 20,
					borderColor: 'white'
				}}
				containerStyle={{
					width: '97%',
					alignSelf: 'center'
				}}
				dropDownContainerStyle={{
					borderColor: 'white',
					borderRadius: 10
				}}
				textStyle={{
					color: 'rgba(33, 37, 37, 0.83)',
					fontSize: 20,
					fontWeight: '600'
				}}
				searchTextInputStyle={{
					borderColor: '#e9e9e9',
					borderRadius: 10,
					fontSize: 20,
					color: 'rgba(33, 37, 37, 0.83)',
					backgroundColor: '#e9e9e9'
				}}
			/>

			{group != '' ? <ChangeGroupButton /> : null}
			{open == false &&
				nameButton.map((name, index) => (
					<SettingsButton
						key={index}
						navigation={navigation}
						route={route}
						name={name}
						routeName={routes[index]}
					/>
				))}
		</BackgroundContainer>
	)
}

export default Settings
