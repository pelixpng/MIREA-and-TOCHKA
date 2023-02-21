import { useNetInfo } from '@react-native-community/netinfo'
import { NetInfoState } from '@react-native-community/netinfo/lib/typescript/src/internal/types'
import React, { FC, useState } from 'react'
import { View, StyleSheet, TextInput, Button, FlatList } from 'react-native'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens'
import ApiService from '../api/MireaApi'
import { parsTeacherSchedule } from '../api/TestTeacherParser'
import { TescherItemProps } from '../components/ui/scheduleTeacher/SubjectTeacher'
import AlertModalService from '../utilities/AlertModal'
import { TeacherSubject } from '../components/ui/scheduleTeacher/SubjectTeacher'

export const FindTeacher: FC = () => {
	const [nameTeacher, setNameTeacher] = useState('')
	const [listOfTeacher, setListOfTeacher] = useState<TescherItemProps[]>([])
	const internetState: NetInfoState = useNetInfo() //проверка подключения к интернету

	const addTeacherSubjectToList = (
		name: string,
		time_start: string,
		time_end: string,
		types: string,
		teachers: string,
		rooms: string,
		dayWeek: string,
		weeks: string,
		group: string
	) => {
		setListOfTeacher(list => {
			return [
				{
					name: name,
					time_start: time_start,
					time_end: time_end,
					types: types,
					teachers: teachers,
					rooms: rooms,
					dayWeek: dayWeek,
					weeks: weeks,
					group: group
				},
				...list
			]
		})
	}

	const findScheduleTeacher = async () => {
		//тут нужно много проверок и всплыабщие окна
		if (internetState.isConnected === false) {
			AlertModalService.noInternet()
		} else {
			try {
				setListOfTeacher([])
				const updateSchedule = await ApiService.teacher_schedule(nameTeacher) //получаем расписание
				const sch = parsTeacherSchedule(updateSchedule) //парсим json файл расписания
				for (let i = 0; i < sch.length; i++) {
					const tmp = sch[i]
					addTeacherSubjectToList(
						tmp.name,
						tmp.time_start,
						tmp.time_end,
						tmp.types,
						tmp.teachers.toString(),
						tmp.rooms.toString(),
						tmp.dayWeek,
						tmp.weeks.toString(),
						tmp.group
					)
				}
			} catch (e) {
				AlertModalService.teacherNotFound(nameTeacher)
				console.log(e)
			}
		}
	}

	return (
		<View>
			<TextInput
				placeholder={'Напиши фамилию препода...'}
				onChangeText={setNameTeacher}
				style={{ fontSize: 50 }}
			/>
			<Button title='Поиск' onPress={findScheduleTeacher} />
			<FlatList
				data={listOfTeacher}
				renderItem={({ item }) => <TeacherSubject data={item} />}
				key={Math.random().toString(36).substring(7)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	subject: {
		padding: 20,
		borderRadius: 5,
		backgroundColor: 'white',
		marginTop: 20,
		width: '97%',
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
