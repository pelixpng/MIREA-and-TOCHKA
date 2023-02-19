import { FC, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useReduxSelector } from '../../../redux'
import Subject from './Subject'
import { ItemProps } from './Subject'

interface ComponentProps {
	dayNumber: number
}

function Day({ dayNumber }: ComponentProps) {
	const [listOfSubject, setListOfSubject] = useState<ItemProps[]>([])
	// const params = {}
	const finalPairs = useReduxSelector(state => state.counter.schedulePars)
	const addSubject = (
		name: string,
		rooms: string,
		teachers: string,
		time_end: string,
		time_start: string,
		types: string
	) => {
		setListOfSubject(list => {
			return [
				{
					name: name,
					rooms: rooms,
					teachers: teachers,
					time_end: time_end,
					time_start: time_start,
					types: types
				},
				...list
			]
		})
	}
	useEffect(() => {
		//console.log(dayNumber)
		setListOfSubject([])
		if (!finalPairs?.[dayNumber]?.length) return
		if (dayNumber != 6) {
			for (let i = 0; i < finalPairs[dayNumber].length; i++) {
				//не используй эни
				const tmp = finalPairs[dayNumber][i]
				addSubject(
					tmp.name,
					tmp.rooms[0],
					tmp.teachers[0],
					tmp.time_end,
					tmp.time_start,
					tmp.types
				)
			}
		}
	}, [finalPairs])

	return (
		<View>
			<Text>{dayNumber}</Text>
			<FlatList
				data={listOfSubject}
				renderItem={({ item }) => <Subject data={item} />}
				keyExtractor={item => item.time_start}
			/>
		</View>
	)
}

export default Day
