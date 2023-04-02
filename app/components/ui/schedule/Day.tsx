import React, { useMemo, useState } from 'react'
import { useReduxSelector } from '../../../redux'
import Subject, { ItemProps } from './Subject'
import { NoPair } from './NoPairDay'
import { BackgroundContainer } from '../../UniversalComponents'
import { ScrollContainer } from '../../UniversalComponents'

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
					types,
					key: Math.random().toString().substring(3, 7)
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
		<BackgroundContainer height='100%'>
			{listOfSubject.length == 0 && <NoPair />}
			<ScrollContainer>
				{listOfSubject.map((item, index) => (
					<Subject data={item} key={index} />
				))}
			</ScrollContainer>
		</BackgroundContainer>
	)
}

export default Day
