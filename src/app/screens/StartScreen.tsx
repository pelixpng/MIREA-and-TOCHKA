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
import StorageServiceMMKV from '../Storage/Storage'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import { StyledColor } from '../types/styled'
import {
	BackgroundContainer,
	DynamicButton,
	MainButtonTitle
} from '../components/UniversalComponents'

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>

const StartScreen: FC<Props> = ({ navigation }) => {
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	const [group, setGroup] = useState('') //тут хранится состояние инпут поля
	const [open, setOpen] = useState(false)
	const dispatch = useReduxDispatch() //запись в хранилище
	const allGroups = useReduxSelector(state => state.counter.allGroupsList)
	const theme: DefaultTheme = useTheme()

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
			<DynamicButton
				bg={ifOffline ? 'rgba(172, 172, 172, 0.2)' : theme.colors.dynamicButton}
				onPress={() => {
					if (ifOffline) {
						AlertModalService.noInternet()
					} else {
						setStatrGroup()
					}
				}}
			>
				<MainButtonTitle>Сменить группу </MainButtonTitle>
			</DynamicButton>
		)
	}

	return (
		<BackgroundContainer height="100%">
			<HeaderText>Привет!</HeaderText>
			<DropDownPicker
				open={open}
				value={group}
				items={allGroups}
				setOpen={setOpen}
				setValue={setGroup}
				searchable={true}
				theme={theme.names.themeName}
				multiple={false}
				mode="BADGE"
				dropDownDirection="AUTO"
				language="RU"
				placeholder="Выбери группу..."
				searchPlaceholderTextColor={theme.colors.mainText}
				searchTextInputProps={{
					maxLength: 10
				}}
				searchPlaceholder="Напишите группу..."
				style={{
					marginTop: 10,
					minHeight: 50,
					paddingVertical: 3,
					borderRadius: 20,
					borderWidth: 0
				}}
				containerStyle={{
					width: '97%',
					alignSelf: 'center'
				}}
				dropDownContainerStyle={{
					borderRadius: 10,
					borderWidth: 0
				}}
				textStyle={{
					color: theme.colors.mainText,
					fontSize: 20,
					fontWeight: '400'
				}}
				searchTextInputStyle={{
					borderWidth: 0,
					borderRadius: 10,
					fontSize: 20,
					color: theme.colors.mainText,
					backgroundColor: theme.colors.backgroundApp
				}}
			/>
			{group != '' ? <SelectGroupButton /> : null}
			<StatusBar style="auto" />
		</BackgroundContainer>
	)
}

const HeaderText = styled.Text`
	width: auto;
	height: auto;
	font-weight: 400;
	font-size: 40px;
	align-self: center;
	color: ${props => props.theme.colors.mainText};
	margin-top: 40px;
`

export default StartScreen
