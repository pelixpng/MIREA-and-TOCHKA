import React, { FC } from 'react'
import { TeacherPair } from '../../../api/TestTeacherParser'
import { TeacherSubject } from './SubjectTeacher'
import { WeekDayItem } from './WeekDay'
import { ScrollContainer } from '../../UniversalComponents'

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
		<ScrollContainer>
			{listOfTeacher.map((day, x) => (
				<>
					{day.length != 0 && <WeekDayItem Day={Days[x]} key={x} />}
					{day.map((pair, y) => (
						<TeacherSubject data={pair} key={y} />
					))}
				</>
			))}
		</ScrollContainer>
	)
}
