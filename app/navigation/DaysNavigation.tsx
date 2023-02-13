import { FC } from 'react'
import { Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Day from '../ui/schedule/Day'
import { getWeekDay } from '../utilities/GetWeekDay'
const Tab = createMaterialTopTabNavigator()

const DaysNavigation: FC = () => {
	const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
	//вывод расписания на неделю
	return (
		<Tab.Navigator initialRouteName={getWeekDay()}>
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
