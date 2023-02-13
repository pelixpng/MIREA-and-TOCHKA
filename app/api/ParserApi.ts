import { ScheduleResponse } from "../types/schedule"
import AlertModalService from "../utilities/AlertModal"
//TODO: почитать про еслинт и подключить его!

export interface Pair {
	name: string
	time_start: string
	time_end: string
	types: string
	teachers: string[]
	rooms: string[]
}


export function parsSchedule(mainWeek: number, mainScheduleJson: ScheduleResponse) {
    function even(week: number) {
		return week % 2 == 0 ? 1 : 0
	}

	
	
	function MYparsing() {
		const schedule: Pair[][] = []
		const typeWeek = even(mainWeek)
		if (mainScheduleJson.group == undefined) {
            throw new Error('Группа не найдена');
		} else {
			for (let day = 1; day < 7; day++) {
				const dayPairs = mainScheduleJson?.schedule[day]?.lessons?.reduce(
					(acc, lesson) => {
						const title = lesson?.[typeWeek]?.name
						const dayPair: Pair = {
							name: title,
							time_start: lesson?.[typeWeek]?.time_start,
							time_end: lesson?.[typeWeek]?.time_end,
							types: lesson?.[typeWeek]?.types,
							teachers: lesson?.[typeWeek]?.teachers,
							rooms: lesson?.[typeWeek]?.rooms
						}
						if (title) {
							acc.push(dayPair)
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
	return MYparsing()
}