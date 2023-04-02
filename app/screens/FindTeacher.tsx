import React, { FC, useEffect, useState } from 'react'
import { TextInput, Keyboard } from 'react-native'
import { parsTeacherSchedule, TeacherPair } from '../api/TestTeacherParser'
import { useReduxSelector } from '../redux'
import { SearchLoading } from '../components/ui/scheduleTeacher/SearchLoading'
import { AntDesign } from '@expo/vector-icons'
import { SearceListComponent } from '../components/ui/scheduleTeacher/SearchResponce'
import styled from 'styled-components/native'
import { Filter, TextForLoading } from '../types/FindTeacher.types'
import { StyledColor } from '../types/styled'
import {
	SmallBbutton,
	SmallButtonText
} from '../components/UniversalComponents'

export const FindTeacher: FC = () => {
	const [searchSettings, setSearchSettings] = useState<Filter>('all')
	const [showFilter, setShowFilter] = useState(false)
	const [textForLoading, setTextForLoading] = useState<TextForLoading>(
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
			if (searchSettings == 'thisWeek') {
				findScheduleTeacher(null, week)
				Keyboard.dismiss()
			} else if (searchSettings == 'toDay') {
				findScheduleTeacher(date.getDay(), week)
				Keyboard.dismiss()
			} else {
				findScheduleTeacher(null, null)
				Keyboard.dismiss()
			}
		}
	}, [ifOffline, nameTeacher, searchSettings])

	const findScheduleTeacher = async (
		toDay: number | null,
		toWeek: number | null
	) => {
		setTextForLoading('Ищу преподавателя')
		setIsSearchLoading(false)
		setListOfTeacher([])
		const sch = await parsTeacherSchedule(nameTeacher, toDay, toWeek)
		if (sch.every(subArr => subArr.length === 0)) {
			setTextForLoading('Преподавателя нету сегодня')
		} else {
			setListOfTeacher(sch)
			setIsSearchLoading(true)
		}
	}

	const FilterComponent: FC = () => {
		return (
			<FilterContainer>
				<ThisDayContainer>
					<SmallBbutton
						bg={searchSettings == 'toDay' ? '#fa9292' : 'white'}
						onPress={() => {
							if (searchSettings == 'toDay') {
								setSearchSettings('all')
							} else {
								setSearchSettings('toDay')
							}
						}}
					>
						<SmallButtonText
							bg={searchSettings == 'toDay' ? '#212525' : '#adadae'}
						>
							СЕГОДНЯ
						</SmallButtonText>
					</SmallBbutton>
				</ThisDayContainer>
				<ThisWeekContainer>
					<SmallBbutton
						bg={searchSettings == 'thisWeek' ? '#fa9292' : 'white'}
						onPress={() => {
							if (searchSettings == 'thisWeek') {
								setSearchSettings('all')
							} else {
								setSearchSettings('thisWeek')
							}
						}}
					>
						<SmallButtonText
							bg={searchSettings == 'thisWeek' ? '#212525' : '#adadae'}
						>
							{week + ' НЕДЕЛЯ'}
						</SmallButtonText>
					</SmallBbutton>
				</ThisWeekContainer>
			</FilterContainer>
		)
	}

	return (
		<SearchContainer>
			<PlaceholderContainer>
				<AntDesign
					name='search1'
					size={23}
					color={'#adadae'}
					style={{ left: 10, width: 'auto' }}
				/>
				<TextInput
					placeholderTextColor={'#adadae'}
					placeholder={'Имя преподавателя...'}
					onChangeText={setNameTeacher}
					style={{
						fontSize: 25,
						width: 'auto',
						height: 'auto',
						margin: 0,
						left: 15,
						color: '#212525;'
					}}
				/>
				<FilterButton
					onPress={() => {
						setShowFilter(!showFilter)
					}}
				>
					<AntDesign name='setting' size={23} color={'#adadae'} />
				</FilterButton>
			</PlaceholderContainer>

			{showFilter && <FilterComponent />}
			{isSearchLoading ? (
				<SearceListComponent listOfTeacher={listOfTeacher} />
			) : (
				<SearchLoading state={textForLoading} />
			)}
		</SearchContainer>
	)
}

const FilterContainer = styled.View`
	flex-direction: row;
	width: 94%;
	height: auto;
	margin-top: 20;
`

const PlaceholderContainer = styled.View`
	width: 94%;
	border-radius: 20;
	background-color: #ffffff;
	align-items: center;
	flex-direction: row;
	height: 35;
`

const SearchContainer = styled.View`
	align-items: center;
	background-color: 'rgba(233, 233, 233, 1);';
	width: 100%;
	height: 100%;
`

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

const FilterButton = styled.TouchableOpacity`
	width: auto;
	height: auto;
	align-items: center;
	margin-left: auto;
	margin-right: 10;
`
