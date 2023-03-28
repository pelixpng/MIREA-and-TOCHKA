import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { useReduxSelector } from '../../../redux'
import Subject, { ItemProps } from './Subject'
import styled from 'styled-components/native'
import { NoPair } from './NoPairDay'

interface ComponentProps {
	dayNumber: number
}

function Day({ dayNumber }: ComponentProps) {
	const [listOfSubject, setListOfSubject] = useState<ItemProps[]>([])
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
					name,
					rooms,
					teachers,
					time_end,
					time_start,
					types
				},
				...list
			]
		})
	}

	useMemo(() => {
		setListOfSubject([])
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
		<ViewDay>
			{listOfSubject.length == 0 && <NoPair />}
			<FlatList
				data={listOfSubject}
				renderItem={({ item }) => <Subject data={item} />}
				keyExtractor={item => item.time_start}
			/>
		</ViewDay>
	)
}

const ViewDay = styled.View`
	background-color: '#e9e9e9';
	height: 100%;
`

export default Day
