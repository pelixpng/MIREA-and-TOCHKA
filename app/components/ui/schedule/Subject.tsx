import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

// type ElementProps = JSON

interface Props {
	data: ItemProps
}

export interface ItemProps {
	name: string
	rooms: string
	teachers: string
	time_end: string
	time_start: string
	types: string
}

const Subject = (props: Props) => {
	const { time_start, time_end, name, rooms, teachers, types } = props.data
	return (
		<TouchableOpacity style={styles.subject}>
			<View style={styles.time}>
				<Text>{props.data.time_start}</Text>
				{/* <Text>{end}</Text> */}
			</View>
			<View style={styles.nameSubject}>
				<Text>{props.data.name}</Text>
				{/* <Text>{teacher}</Text> */}
			</View>
			<View style={styles.placeAndType}>
				<Text>{props.data.types}</Text>
				{/* <Text>{typeSub}</Text> */}
			</View>
		</TouchableOpacity>
	)
}

export default Subject
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
	},
	time: {
		flexDirection: 'column'
	},
	nameSubject: {
		flexDirection: 'column'
	},
	placeAndType: {
		flexDirection: 'column'
	}
})
