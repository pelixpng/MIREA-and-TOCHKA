import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import React from 'react'

interface Props {
	data: TescherItemProps
}

export interface TescherItemProps {
	group: string
	dayWeek: string
	name: string
	rooms: string
	teachers: string
	time_end: string
	time_start: string
	types: string
	weeks: string
}

export const TeacherSubject = (props: Props) => {
	const { time_start, time_end, name, rooms, teachers, types } = props.data
	return (
		<TouchableOpacity style={styles.subject}>
			<View>
				<Text>
					{props.data.dayWeek +
						'    ' +
						props.data.time_start +
						'---' +
						props.data.time_end}
				</Text>
				<Text>{props.data.name}</Text>
				<Text>{props.data.types}</Text>
				<Text>{props.data.rooms}</Text>
				<Text>{props.data.teachers}</Text>
				<Text>{'Недели: ' + props.data.weeks}</Text>
			</View>
		</TouchableOpacity>
	)
}

// styled-components one ❤️
const styles = StyleSheet.create({
	subject: {
		padding: 20,
		borderRadius: 5,
		backgroundColor: 'white',
		marginTop: 20,
		width: '97%',
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
	// time: {
	// 	flexDirection: 'column'
	// },
	// nameSubject: {
	// 	flexDirection: 'column'
	// },
	// placeAndType: {
	// 	flexDirection: 'column'
	// }
})
