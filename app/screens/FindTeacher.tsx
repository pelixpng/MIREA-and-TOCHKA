import React, { FC, useEffect, useState } from 'react'
import { View, TextInput, Keyboard } from 'react-native'
import ApiService from '../api/MireaApi'
import { parsTeacherSchedule, TeacherPair } from '../api/TestTeacherParser'
import AlertModalService from '../utilities/AlertModal'
import { useReduxSelector } from '../redux'
import { SearchLoading } from '../components/ui/scheduleTeacher/SearchLoading'
import { AntDesign } from '@expo/vector-icons'
import { SearceListComponent } from '../components/ui/scheduleTeacher/SearchResponce'
import styled from 'styled-components/native'

export const FindTeacher: FC = () => {
	const [showFilter, setShowFilter] = useState(false)
	const [triggerUseEffect, setTriggerUseEffect] = useState('')
	const [isSearchToDay, setIsSearchToDay] = useState(false)
	const [isSearchInThisWeek, setisSearchInThisWeek] = useState(false)
	const [textForLoading, setTextForLoading] = useState(
		'Здесь появятся результаты поиска'
	)
	const [isSearchLoading, setIsSearchLoading] = useState(false) // статус загрузки приложения
	const [nameTeacher, setNameTeacher] = useState('')
	const [listOfTeacher, setListOfTeacher] = useState<Array<Array<TeacherPair>>>(
		[[], [], [], [], [], []]
	)
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	const week = useReduxSelector(state => state.counter.week)
	const regex = /^[А-Яа-я]+\s+[А-Яа-я]\.\s*[А-Яа-я]\.?$/
	const testForEmty: Array<Array<TeacherPair>> = [[], [], [], [], [], []]
	const date = new Date()

	useEffect(() => {
		setIsSearchLoading(false)
		if (ifOffline) {
			setTextForLoading('Нет подключеения к интернету')
		} else if (regex.test(nameTeacher) == false && nameTeacher.length != 0) {
			setTextForLoading('Запрос не соответствует \n формату: Xxxx X.X.')
		} else if (nameTeacher.length == 0) {
			setTextForLoading('Здесь появятся результаты поиска')
		} else if (regex.test(nameTeacher) == true && ifOffline == false) {
			if (isSearchInThisWeek && isSearchToDay == false) {
				findScheduleTeacher(null, week)
				Keyboard.dismiss()
			} else if (isSearchToDay && isSearchInThisWeek == false) {
				findScheduleTeacher(date.getDay(), week)
				Keyboard.dismiss()
			} else {
				findScheduleTeacher(null, null)
				Keyboard.dismiss()
			}
		}
	}, [ifOffline, nameTeacher, triggerUseEffect])

	const findScheduleTeacher = async (
		toDay: number | null,
		toWeek: number | null
	) => {
		if (ifOffline == true) {
			AlertModalService.noInternet()
		} else {
			try {
				setTextForLoading('Ищу: ' + nameTeacher)
				setIsSearchLoading(false)
				setListOfTeacher([])
				const updateSchedule = await ApiService.teacher_schedule(nameTeacher) //получаем расписание
				const sch = parsTeacherSchedule(
					updateSchedule,
					nameTeacher,
					toDay,
					toWeek
				) //парсим json файл расписания
				if (sch.toString() == testForEmty.toString()) {
					setTextForLoading('Преподавателя нету сегодня.')
				} else {
					setListOfTeacher(sch)
					setIsSearchLoading(true)
					setTextForLoading('Здесь появятся результаты поиска')
				}
			} catch (e) {
				console.log(e)
			}
		}
	}

	const FilterComponent: FC = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					width: '94%',
					height: 'auto',
					//marginTop: 20,
					margin: 20
				}}
			>
				<ThisDayContainer>
					<ButtonContainer
						testID={isSearchToDay ? '#fa9292' : 'white'}
						onPress={() => {
							if (isSearchToDay) {
								setIsSearchToDay(false)
							} else {
								setIsSearchToDay(true)
								setisSearchInThisWeek(false)
							}
							setTriggerUseEffect(Math.random().toString().substring(3, 8))
						}}
					>
						<ButtonText testID={isSearchToDay ? '#212525' : '#adadae'}>
							Сегодня
						</ButtonText>
					</ButtonContainer>
				</ThisDayContainer>
				<ThisWeekContainer>
					<ButtonContainer
						testID={isSearchInThisWeek ? '#fa9292' : 'white'}
						onPress={() => {
							if (isSearchInThisWeek) {
								setisSearchInThisWeek(false)
							} else {
								setisSearchInThisWeek(true)
								setIsSearchToDay(false)
							}
							setTriggerUseEffect(Math.random().toString().substring(3, 8))
						}}
					>
						<ButtonText testID={isSearchInThisWeek ? '#212525' : '#adadae'}>
							{week.toString() + ' неделя'}
						</ButtonText>
					</ButtonContainer>
				</ThisWeekContainer>
			</View>
		)
	}

	return (
		<View
			style={{
				backgroundColor: '#e9e9e9',
				alignItems: 'center',
				width: '100%',
				height: '100%'
			}}
		>
			<View style={{ width: '94%', flexDirection: 'row' }}>
				<View
					style={{
						width: '100%',
						borderRadius: 20,
						backgroundColor: '#ffffff',
						alignItems: 'center',
						flexDirection: 'row',
						height: 35
					}}
				>
					<AntDesign
						name='search1'
						size={23}
						color={'#adadae'}
						style={{ left: 10 }}
					/>
					<TextInput
						placeholderTextColor={'#adadae'}
						placeholder={'Имя преподавателя...'}
						onChangeText={setNameTeacher}
						style={{
							fontSize: 25,
							width: '83%',
							margin: 0,
							left: 15,
							color: '#212525;'
						}}
					/>
					<FilterContainer
						onPress={() => {
							setShowFilter(!showFilter)
						}}
					>
						<AntDesign name='setting' size={23} color={'#adadae'} />
					</FilterContainer>
				</View>
			</View>
			{showFilter ? <FilterComponent /> : null}
			{isSearchLoading ? (
				<SearceListComponent listOfTeacher={listOfTeacher} />
			) : (
				<SearchLoading state={textForLoading} />
			)}
		</View>
	)
}

const ThisDayContainer = styled.View`
	width: 50%;
	height: auto;
	align-items: center;
`

const ThisWeekContainer = styled.View`
	width: 50%;
	height: auto;
	align-items: center;
`

const ButtonContainer = styled.TouchableOpacity`
	width: 70%;
	height: auto;
	border-radius: 20px;
	background-color: ${props => props.testID};
`
const ButtonText = styled.Text`
	font-size: 25px;
	text-align: center;
	color: ${props => props.testID};
	margin-right: 1%;
	margin-left: 1%;
`
const FilterContainer = styled.TouchableOpacity`
	width: auto;
	height: auto;
	align-items: center;
`
