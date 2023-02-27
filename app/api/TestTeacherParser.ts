import { teacherScheduleReasponse } from '../types/schedule'
import AlertModalService from '../utilities/AlertModal'

export interface TeacherPair {
	group: string
	name: string
	time_start: string
	time_end: string
	types: string
	teachers: string[]
	rooms: string[]
	dayWeek: string
	weeks: string[]
}


function convertWeekDay(day: number) {
	let tmp="?"
	switch (day) {
		case 1: tmp="ПОНЕДЕЛЬНИК"; break;
		case 2: tmp="ВТОРНИК"; break;
		case 3: tmp="СРЕДА"; break;
		case 4: tmp="ЧЕТВЕРГ"; break;
		case 5: tmp="ПЯТНИЦА"; break;
		case 6: tmp="СУББОТА"; break;
		default: tmp="ОШИБКА КОНВЕРТИРОВАНИЯ ДНЯ"; break;
	}
	return tmp
}


export function parsTeacherSchedule(
	teacherScheduleJson: teacherScheduleReasponse,
	nameTeacher: string
) {
	const schedule: TeacherPair[] = []
	try {
			for (let i = 0; i < teacherScheduleJson.schedules.length; i++) {
				const dayPair: TeacherPair = {
				name: teacherScheduleJson.schedules[i]?.lesson?.name,
				time_start: teacherScheduleJson.schedules[i]?.lesson?.time_start,
				time_end: teacherScheduleJson.schedules[i]?.lesson?.time_end,
				types: teacherScheduleJson.schedules[i]?.lesson?.types,
				teachers: teacherScheduleJson.schedules[i]?.lesson?.teachers,
				rooms: teacherScheduleJson.schedules[i]?.lesson?.rooms,
				dayWeek: convertWeekDay(Number(teacherScheduleJson.schedules[i]?.weekday)),
				weeks: teacherScheduleJson.schedules[i]?.lesson?.weeks,
				group: teacherScheduleJson.schedules[i]?.group
			}
			schedule.push(dayPair)
			}
		}	
	catch (error) {
		AlertModalService.teacherNotFound(nameTeacher)
	}
	return schedule;
}
