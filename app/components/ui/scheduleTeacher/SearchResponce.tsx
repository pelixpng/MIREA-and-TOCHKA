import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import { TeacherPair } from '../../../api/TestTeacherParser'
import { TeacherSubject } from './SubjectTeacher'
import { WeekDayItem } from './WeekDay'

const Days = [
	'ПОНЕДЕЛЬНИК',
	'ВТОРНИК',
	'СРЕДА',
	'ЧЕТВЕРГ',
	'ПЯТНИЦА',
	'СУББОТА'
]

export const SearceListComponent: FC<{
	listOfTeacher: Array<Array<TeacherPair>>
}> = ({ listOfTeacher }) => {
	return (
		<ScrollView style={{ backgroundColor: '#e9e9e9' }}>
			{listOfTeacher.map((day, x) => (
				<>
					{day.length != 0 ? <WeekDayItem Day={Days[x]} /> : null}
					{day.map((pair, y) => (
						<TeacherSubject data={pair} key={y} />
					))}
				</>
			))}
		</ScrollView>
	)
}
