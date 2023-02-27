import React, { FC, useEffect, useState } from 'react'
import { View, TextInput, Button, FlatList } from 'react-native'
import ApiService from '../api/MireaApi'
import { parsTeacherSchedule } from '../api/TestTeacherParser'
import { TescherItemProps } from '../components/ui/scheduleTeacher/SubjectTeacher'
import AlertModalService from '../utilities/AlertModal'
import { TeacherSubject } from '../components/ui/scheduleTeacher/SubjectTeacher'
import { useReduxSelector } from '../redux'

export const FindTeacher: FC = () => {
	const [nameTeacher, setNameTeacher] = useState('')
	const [listOfTeacher, setListOfTeacher] = useState<TescherItemProps[]>([])
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	const [collorButton, setCollorButto] = useState('green')

	useEffect(() => {
		if (ifOffline || nameTeacher.length <= 3) {
			setCollorButto('grey')
		} else {
			setCollorButto('green')
		}
	}, [ifOffline, nameTeacher])

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
		if (ifOffline == true) {
			AlertModalService.noInternet()
		} else {
			try {
				setListOfTeacher([])
				const updateSchedule = await ApiService.teacher_schedule(nameTeacher) //получаем расписание
				console.log(updateSchedule)
				const sch = parsTeacherSchedule(updateSchedule, nameTeacher) //парсим json файл расписания
				console.log(sch)
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
			<Button
				title='Далее'
				onPress={() => {
					if (ifOffline) {
						AlertModalService.noInternet()
					} else if (nameTeacher.length <= 3) {
						AlertModalService.groupNotSelect()
					} else {
						findScheduleTeacher()
					}
				}}
				color={collorButton}
			/>
			<FlatList
				data={listOfTeacher}
				renderItem={({ item }) => <TeacherSubject data={item} />}
				key={Math.random().toString(36).substring(7)}
			/>
		</View>
	)
}
