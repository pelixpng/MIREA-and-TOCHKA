import { teacherScheduleReasponse } from '../types/schedule'
import AlertModalService from '../utilities/AlertModal'

export interface TeacherPair {
	group: string
	name: string
	time_start: string
	time_end: string
	types: string
	teachers: string
	rooms: string
	dayWeek: string
	weeks: number[]
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
	nameTeacher: string,
	dayWeekSettings: number | null,
	weekSettings: number | null,
) {
	const weekSched: Array<Array<TeacherPair>> = [[],[],[],[],[],[]]
	try {
			for (let i = 0; i < teacherScheduleJson.schedules.length; i++) {
				const dayPair: TeacherPair = {
					name: teacherScheduleJson.schedules[i]?.lesson?.name,
					time_start: teacherScheduleJson.schedules[i]?.lesson?.time_start,
					time_end: teacherScheduleJson.schedules[i]?.lesson?.time_end,
					types: teacherScheduleJson.schedules[i]?.lesson?.types,
					teachers: teacherScheduleJson.schedules[i]?.lesson?.teachers.toString(),
					rooms: teacherScheduleJson.schedules[i]?.lesson?.rooms.toString(),
					dayWeek: convertWeekDay(Number(teacherScheduleJson.schedules[i]?.weekday)),
					weeks: teacherScheduleJson.schedules[i]?.lesson?.weeks,
					group: teacherScheduleJson.schedules[i]?.group
				}
				if(dayWeekSettings==Number(teacherScheduleJson.schedules[i]?.weekday) && weekSettings!=null){
					if (teacherScheduleJson.schedules[i]?.lesson?.weeks.includes(weekSettings)) {
						weekSched[dayWeekSettings-1].push(dayPair)
					}
				}
				else if(weekSettings!=null && dayWeekSettings==null){
					if (teacherScheduleJson.schedules[i]?.lesson?.weeks.includes(weekSettings)) {
						switch (Number(teacherScheduleJson.schedules[i]?.weekday)) {
							case 1: weekSched[0].push(dayPair); break;
							case 2: weekSched[1].push(dayPair); break;
							case 3: weekSched[2].push(dayPair); break;
							case 4: weekSched[3].push(dayPair); break;
							case 5: weekSched[4].push(dayPair); break;
							case 6: weekSched[5].push(dayPair); break;
							default: console.log("error"); break;
						}
					}
				}
				else if(dayWeekSettings==null && weekSettings==null){
					switch (Number(teacherScheduleJson.schedules[i]?.weekday)) {
						case 1: weekSched[0].push(dayPair); break;
						case 2: weekSched[1].push(dayPair); break;
						case 3: weekSched[2].push(dayPair); break;
						case 4: weekSched[3].push(dayPair); break;
						case 5: weekSched[4].push(dayPair); break;
						case 6: weekSched[5].push(dayPair); break;
						default: console.log("error"); break;
					}
				}
			}
		}	
	catch (error) {
		AlertModalService.teacherNotFound(nameTeacher)
	}
	return weekSched;
}
