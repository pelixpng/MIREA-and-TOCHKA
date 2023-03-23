import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import { TeacherPair } from '../../../api/TestTeacherParser'
import { TeacherSubject } from './SubjectTeacher'
import { WeekDayItem } from './WeekDay'

export const SearceListComponent: FC<{
	listOfTeacher: Array<Array<TeacherPair>>
}> = ({ listOfTeacher }) => {
	return (
		<ScrollView style={{ backgroundColor: '#e9e9e9' }}>
			{listOfTeacher[0].length != 0 ? (
				<WeekDayItem Day={'ПОНЕДЕЛЬНИК'} />
			) : null}
			{listOfTeacher[0].map(item => (
				<TeacherSubject
					data={item}
					key={Math.random().toString().substring(3, 8)}
				/>
			))}

			{listOfTeacher[1].length != 0 ? <WeekDayItem Day={'ВТОРНИК'} /> : null}
			{listOfTeacher[1].map(item => (
				<TeacherSubject
					data={item}
					key={Math.random().toString().substring(3, 8)}
				/>
			))}
			{listOfTeacher[2].length != 0 ? <WeekDayItem Day={'СРЕДА'} /> : null}
			{listOfTeacher[2].map(item => (
				<TeacherSubject
					data={item}
					key={Math.random().toString().substring(3, 8)}
				/>
			))}
			{listOfTeacher[3].length != 0 ? <WeekDayItem Day={'ЧЕТВЕРГ'} /> : null}
			{listOfTeacher[3].map(item => (
				<TeacherSubject
					data={item}
					key={Math.random().toString().substring(3, 8)}
				/>
			))}
			{listOfTeacher[4].length != 0 ? <WeekDayItem Day={'ПЯТНИЦА'} /> : null}
			{listOfTeacher[4].map(item => (
				<TeacherSubject
					data={item}
					key={Math.random().toString().substring(3, 8)}
				/>
			))}
			{listOfTeacher[5].length != 0 ? <WeekDayItem Day={'СУББОТА'} /> : null}
			{listOfTeacher[5].map(item => (
				<TeacherSubject
					data={item}
					key={Math.random().toString().substring(3, 8)}
				/>
			))}
		</ScrollView>
	)
}
