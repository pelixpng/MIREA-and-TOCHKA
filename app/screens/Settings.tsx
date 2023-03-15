import React, { FC, useEffect, useState } from 'react'
import { Button, View } from 'react-native'
import { useReduxSelector, useReduxDispatch } from '../redux'
import { addAllgroupToRedux, addScheduleParsToRedux } from '../redux/counter'
import ApiService from '../api/MireaApi'
import { parsSchedule } from '../api/ParserApi'
import AlertModalService from '../utilities/AlertModal'
import { useNavigation } from '@react-navigation/native'
import { SettingsStackParamList } from '../types/Navigation.types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import DropDownPicker from 'react-native-dropdown-picker'
import { GroupListParser } from '../api/AllGroupListParser'
import { SettingsButton } from '../components/ui/settings/ButtonSettings'
import styled from 'styled-components/native'
import StorageServiceMMKV, { Storage } from '../Storage/Storage'

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
	const nameButton: string[] = ['Обратная связь', 'О приложении']
	type routeNameType = 'AboutApp' | 'FeedBack' | 'Settings'
	const routes: routeNameType[] = ['FeedBack', 'AboutApp']

	useEffect(() => {
		if (ifOffline || group == '') {
			if (ifOffline == false) {
				getListParser()
			}
		}
	}, [ifOffline, group])

	const getListParser = async () => {
		dispatch(addAllgroupToRedux(await GroupListParser()))
	}

	const changeGroup = async () => {
		try {
			const updateSchedule = await ApiService.full_schedule(group) //получаем расписание
			const lastUpdate = await ApiService.getLastUpdate(group)
			StorageServiceMMKV.saveGroup(group, dispatch)
			StorageServiceMMKV.saveLastUpdate(lastUpdate.updated_at)
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
				<Title>Сменить группу </Title>
			</ButtonContainer>
		)
	}

	return (
		<View style={{ backgroundColor: '#e9e9e9', height: '100%' }}>
			<Button title='f' onPress={() => Storage.clearAll()} />
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
					// width: '97%',
					// alignSelf: 'center'
				}}
				containerStyle={{
					width: '97%',
					alignSelf: 'center'
					//borderColor: 'white'
				}}
				dropDownContainerStyle={{
					borderColor: 'white',
					borderRadius: 20
				}}
				textStyle={{
					color: 'rgba(33, 37, 37, 0.83)',
					fontSize: 20,
					fontWeight: '600'
				}}
				searchTextInputStyle={{
					borderColor: 'grey',
					borderRadius: 10,
					fontSize: 20,
					color: 'rgba(33, 37, 37, 0.83)'
				}}
			/>

			{group != '' ? <ChangeGroupButton /> : null}
			{open == false
				? nameButton.map((name, index) => (
						<SettingsButton
							key={index}
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
