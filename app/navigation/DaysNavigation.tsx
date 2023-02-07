import { FC } from 'react'
import { Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Day from '../ui/schedule/Day'
import { useReduxSelector } from '../redux'
import { getWeekDay } from '../utilities/GetWeekDay'
const Tab = createMaterialTopTabNavigator()

const DaysNavigation: FC = () => {
	const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

	//Math.random.toString()
	return (
		<Tab.Navigator initialRouteName={getWeekDay()}>
			{days.map((item, index) => (
				<Tab.Screen name={item} component={() => Day(index)} key={index} />
			))}
		</Tab.Navigator>
	)
}

export default DaysNavigation
