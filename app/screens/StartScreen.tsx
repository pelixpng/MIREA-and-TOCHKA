import React, { FC, useEffect, useState } from 'react'
import { Button, View } from 'react-native'
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
import StorageServiceMMKV from '../Storage/Storage'
import styled from 'styled-components/native'

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>

const StartScreen: FC<Props> = ({ navigation }) => {
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	const [group, setGroup] = useState('') //тут хранится состояние инпут поля
	const [open, setOpen] = useState(true)
	const dispatch = useReduxDispatch() //запись в хранилище
	const allGroups = useReduxSelector(state => state.counter.allGroupsList)

	const setStatrGroup = async () => {
		try {
			const updateSchedule = await ApiService.full_schedule(group) //получаем расписание
			const mainWeek = await ApiService.current_week() //получаем неделю
			const lastUpdateSchedule = await ApiService.getLastUpdate(group)
			StorageServiceMMKV.saveGroup(group, dispatch)
			StorageServiceMMKV.saveLastUpdate(lastUpdateSchedule.updated_at)
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
				testID={
					ifOffline ? 'rgba(172, 172, 172, 0.2)' : 'rgba(0, 255, 144, 0.2)'
				}
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
		<View>
			{/* <Button
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
			/> */}
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
			{group != '' ? <SelectGroupButton /> : null}
			<StatusBar style='auto' />
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

export default StartScreen
