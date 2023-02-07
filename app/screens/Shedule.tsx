import React, { FC } from 'react'
import { Button, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { useReduxSelector } from '../redux'
import DaysNavigation from '../navigation/DaysNavigation'

const Shedule: FC = () => {
	const mainGroup = useReduxSelector(state => state.counter.group)
	const mainWeek = useReduxSelector(state => state.counter.week)
	const mainSchedule = useReduxSelector(state => state.counter.schedule)

	return (
		<View>
			<Text style={{ fontSize: 30 }}>Группа в Redux: {mainGroup}</Text>
			<Text style={{ fontSize: 30 }}>Учебная неделя: {mainWeek}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	}
})

export default Shedule
