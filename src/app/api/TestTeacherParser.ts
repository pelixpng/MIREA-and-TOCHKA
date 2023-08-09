import { TeacherScheduleReasponse } from '../types/schedule'
import AlertModalService from '../utilities/AlertModal'
import ApiService from './MireaApi'

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
	let convertDay="?"
	switch (day) {
		case 1: convertDay="ПОНЕДЕЛЬНИК"; break;
		case 2: convertDay="ВТОРНИК"; break;
		case 3: convertDay="СРЕДА"; break;
		case 4: convertDay="ЧЕТВЕРГ"; break;
		case 5: convertDay="ПЯТНИЦА"; break;
		case 6: convertDay="СУББОТА"; break;
		default: convertDay="ОШИБКА КОНВЕРТИРОВАНИЯ ДНЯ"; break;
	}
	return convertDay
}

export async function parsTeacherSchedule(
	//teacherScheduleJson: TeacherScheduleReasponse,
	nameTeacher: string,
	dayWeekSettings: number | null,
	weekSettings: number | null,
) {
	const teacherScheduleJson = await ApiService.getTeacherSchedule(nameTeacher)
	const weekSchedule: Array<Array<TeacherPair>> = [[],[],[],[],[],[]]
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
						weekSchedule[dayWeekSettings-1].push(dayPair)
					}
				}
				else if(weekSettings!=null && dayWeekSettings==null){
					if (teacherScheduleJson.schedules[i]?.lesson?.weeks.includes(weekSettings)) {
						switch (Number(teacherScheduleJson.schedules[i]?.weekday)) {
							case 1: weekSchedule[0].push(dayPair); break;
							case 2: weekSchedule[1].push(dayPair); break;
							case 3: weekSchedule[2].push(dayPair); break;
							case 4: weekSchedule[3].push(dayPair); break;
							case 5: weekSchedule[4].push(dayPair); break;
							case 6: weekSchedule[5].push(dayPair); break;
							default: console.log("error"); break;
						}
					}
				}
				else if(dayWeekSettings==null && weekSettings==null){
					switch (Number(teacherScheduleJson.schedules[i]?.weekday)) {
						case 1: weekSchedule[0].push(dayPair); break;
						case 2: weekSchedule[1].push(dayPair); break;
						case 3: weekSchedule[2].push(dayPair); break;
						case 4: weekSchedule[3].push(dayPair); break;
						case 5: weekSchedule[4].push(dayPair); break;
						case 6: weekSchedule[5].push(dayPair); break;
						default: console.log("error"); break;
					}
				}
			}
		}	
	catch (error) {
		AlertModalService.teacherNotFound(nameTeacher)
		console.log(error)
	}
	return weekSchedule;
}
