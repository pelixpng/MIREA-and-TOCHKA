import React, { FC } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Day from '../components/ui/schedule/Day'
import { getWeekDay } from '../utilities/GetWeekDay'
import { View, Text } from 'react-native'
import { HeaderSchedule } from '../components/ui/HeaderSchedule'
import moment from 'moment'
const Tab = createMaterialTopTabNavigator()

const DaysNavigation: FC = () => {
	const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

	//вывод расписания на неделю
	return (
		<Tab.Navigator
			initialRouteName={getWeekDay()}
			screenOptions={{ tabBarStyle: { backgroundColor: '#e9e9e9' } }}
		>
			{days.map((item, index) => (
				// <Tab.Screen name={item} component={() => Day(index)} key={index} />
				<Tab.Screen name={item} key={index}>
					{props => <Day {...props} dayNumber={index} />}
				</Tab.Screen>
			))}
		</Tab.Navigator>
	)
}

export default DaysNavigation
