import { FC } from 'react'
import { Text, View } from 'react-native'
import { useReduxSelector } from '../../redux'
import SubjectList from './SubjectList'

export interface DayNumber {
	numberDay: number
}

// const Day: FC<DayNumber> = ({ numberDay }) => {
// 	return <SubjectList />
// }

const Day = (numberDay: number) => {
	return (
		<View>
			{/* <Text>{value[0].toString()}</Text> */}
			{/* {value.map((item) => (
				<Text></Text>
			<Tab.Screen name={item} component={() => Day(index)} key={index} />
		))} */}
		</View>
	)
}

export default Day
