import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/Navigation.types'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { addScheduleParsToRedux, addWeekToRedux } from '../redux/counter'
import ApiService from '../api/MireaApi'
import { MainRoutes } from '../navigation/Routes'
import { parsSchedule } from '../api/ParserApi'
import AlertModalService from '../utilities/AlertModal'
import { StatusBar } from 'expo-status-bar'
import DropDownPicker from 'react-native-dropdown-picker'
import StorageServiceMMKV from '../storage/Storage'
import styled from 'styled-components/native'
import { StyledColor } from '../types/styled'

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>

const StartScreen: FC<Props> = ({ navigation }) => {
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	const [group, setGroup] = useState('') //тут хранится состояние инпут поля
	const [open, setOpen] = useState(false)
	const dispatch = useReduxDispatch() //запись в хранилище
	const allGroups = useReduxSelector(state => state.counter.allGroupsList)

	const setStatrGroup = async () => {
		try {
			const updateSchedule = await ApiService.getFullSchedule(group) //получаем расписание
			const mainWeek = await ApiService.getCurrentWeek() //получаем неделю
			StorageServiceMMKV.saveGroup(group, dispatch)
			dispatch(addWeekToRedux(mainWeek))
			const tmp = parsSchedule(mainWeek, updateSchedule) //парсим json файл расписания
			dispatch(addScheduleParsToRedux(tmp)) //запись расписания в Redux
			StorageServiceMMKV.saveSchedule(mainWeek.toString(), JSON.stringify(tmp))
			navigation.navigate(MainRoutes.Shedule) //переходим на экран с расписанием
		} catch (e) {
			//надо добавить проверку на причину ошибки
			AlertModalService.groupNotFound(group)
			console.log(e)
		}
	}

	const SelectGroupButton: FC = () => {
		return (
			<ButtonContainer
				bg={ifOffline ? 'rgba(172, 172, 172, 0.2)' : 'rgba(0, 255, 144, 0.2)'}
				onPress={() => {
					if (ifOffline) {
						AlertModalService.noInternet()
					} else {
						setStatrGroup()
					}
				}}
			>
				<Title>Далее</Title>
			</ButtonContainer>
		)
	}

	return (
		<View style={{ marginTop: 50 }}>
			<HeaderText>Привет!</HeaderText>
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
				placeholder='Выбери группу...'
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
					borderRadius: 20
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
			{group != '' ? <SelectGroupButton /> : null}
			<StatusBar style='auto' />
		</View>
	)
}

const ButtonContainer = styled.TouchableOpacity<StyledColor>`
	padding: 10px;
	border-radius: 10px;
	background-color: ${props => props.bg};
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
	color: rgba(33, 37, 37, 0.83);
`
const HeaderText = styled.Text`
	width: auto;
	height: auto;
	font-weight: 600;
	font-size: 40px;
	align-self: center;
	color: rgba(33, 37, 37, 0.83);
`

export default StartScreen
