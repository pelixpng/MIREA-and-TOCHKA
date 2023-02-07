import { FC } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

// type ElementProps = JSON

const Subject: FC = () => {
	let start = '10:40'
	let end = '12:10'
	let name = 'Разработка баз данных'
	let teacher = 'Коваленко А.В.'
	let room = 'A-420'
	let typeSub = 'ПР'
	return (
		<TouchableOpacity style={styles.subject}>
			<View style={styles.time}>
				<Text>{start}</Text>
				<Text>{end}</Text>
			</View>
			<View style={styles.nameSubject}>
				<Text>{name}</Text>
				<Text>{teacher}</Text>
			</View>
			<View style={styles.placeAndType}>
				<Text>{room}</Text>
				<Text>{typeSub}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default Subject

const styles = StyleSheet.create({
	subject: {
		padding: 20,
		borderRadius: 5,
		backgroundColor: 'white',
		marginTop: 20,
		width: '97%',
		alignSelf: 'center',
		flexDirection: 'row'
	},
	time: {
		textAlign: 'left',
		flex: 1,
		flexDirection: 'column'
	},
	nameSubject: {
		textAlign: 'center',
		flex: 1,
		flexDirection: 'column'
	},
	placeAndType: {
		textAlign: 'right',
		flex: 1,
		flexDirection: 'column'
	}
})
