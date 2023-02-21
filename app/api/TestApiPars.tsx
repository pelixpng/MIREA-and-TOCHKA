// import React, { FC } from 'react'
// import { Button } from 'react-native'
// import { useReduxDispatch, useReduxSelector } from '../redux'
// import { addScheduleParsToRedux } from '../redux/counter'

// interface Props {
// 	onPress: () => void
// }

// export const ButtonParser: FC<Props> = () => {
// 	const mainGroup = useReduxSelector(state => state.counter.group)
// 	const mainWeek = useReduxSelector(state => state.counter.week)
// 	const mainScheduleJson = useReduxSelector(state => state.counter.schedule)
// 	const dispatch = useReduxDispatch() //запись в хранилище

// 	function even(week: number) {
// 		return week % 2 == 0 ? 1 : 0
// 	}

// 	interface Pair {
// 		name: string
// 		time_start: string
// 		time_end: string
// 		types: string
// 		teachers: string[]
// 		rooms: string[]
// 	}
// 	function MYparsing() {
// 		const schedule: Pair[][] = []
// 		const typeWeek = even(mainWeek)
// 		if (mainScheduleJson.group == undefined) {
// 			// throw new
// 			console.log(mainScheduleJson)
// 		} else {
// 			for (let day = 1; day < 7; day++) {
// 				const dayPairs = mainScheduleJson?.schedule[day]?.lessons?.reduce(
// 					(acc, lesson) => {
// 						const title = lesson?.[0]?.name
// 						const dayPair: Pair = {
// 							name: title,
// 							time_start: lesson?.[0]?.time_start,
// 							time_end: lesson?.[0]?.time_end,
// 							types: lesson?.[0]?.types,
// 							teachers: lesson?.[0]?.teachers,
// 							rooms: lesson?.[0]?.rooms
// 						}
// 						if (title) {
// 							acc.push(dayPair)
// 						}
// 						return acc
// 					},
// 					[]
// 				)
// 				schedule.push(dayPairs)
// 			}
// 		}
// 		dispatch(addScheduleParsToRedux(schedule))
// 	}

// 	return <Button title='Парсинг в консоль' onPress={MYparsing} />
// }

// export default ButtonParser
