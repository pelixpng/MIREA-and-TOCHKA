import { ScheduleResponse } from "../types/schedule"

export interface Pair {
	name: string
	time_start: string
	time_end: string
	types: string
	teachers: string[]
	rooms: string[]
	weeks: number[]
}

export function parsSchedule(currentWeek: number, scheduleJson: ScheduleResponse) {
	function parsing() {
		const schedule: Pair[][] = []
		if (scheduleJson.group == undefined) {
            throw new Error('Группа не найдена');
		} else {
			for (let day = 1; day < 7; day++) {
				const dayPairs = scheduleJson?.schedule[day]?.lessons?.reduce(
					(acc, lesson) => {
						for (let i = 0; i < lesson.length; i++) {
							const title = lesson?.[i]?.name
							const dayPair: Pair = {
								name: title,
								time_start: lesson?.[i]?.time_start,
								time_end: lesson?.[i]?.time_end,
								types: lesson?.[i]?.types,
								teachers: lesson?.[i]?.teachers,
								rooms: lesson?.[i]?.rooms,
								weeks: lesson?.[i]?.weeks
							}
							if (lesson?.[i]?.weeks.includes(currentWeek)) {
								acc.push(dayPair)
							}
						}
						return acc
					},
					[]
				)
				schedule.push(dayPairs)
			}
		}
		return schedule
	}
	return parsing()
}



