import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import { useReduxSelector } from '../../../redux'
import Subject, { ItemProps } from './Subject'

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
		setListOfSubject([])
		//когда в дне нет пар поставить заглушку
		if (!finalPairs?.[dayNumber]?.length) return
		if (dayNumber != 6) {
			for (let i = finalPairs[dayNumber].length - 1; i >= 0; i--) {
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
		<View style={styles.day}>
			<FlatList
				data={listOfSubject}
				renderItem={({ item }) => <Subject data={item} />}
				keyExtractor={item => item.time_start}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	day: {
		backgroundColor: '#e9e9e9'
	}
})

export default Day
