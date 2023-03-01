import React, { FC, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Day from '../components/ui/schedule/Day'
import { getWeekDay } from '../utilities/GetWeekDay'
import { View, Text } from 'react-native'
import { HeaderSchedule } from '../components/ui/HeaderSchedule'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'
import { HeaderDay } from '../components/ui/schedule/NavigationDayItem'
import { getColor, ItemProps } from '../components/ui/schedule/Subject'
import { useReduxSelector } from '../redux'

const Tab = createMaterialTopTabNavigator()

const DaysNavigation: FC = () => {
	const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
	const tmpNumbers = ['27', '28', '1', '2', '3', '4', '5']
	const finalPairs = useReduxSelector(state => state.counter.schedulePars)

	function getArrayColors(index: number) {
		let colors: string[] = []
		for (let i = 0; i < finalPairs?.[index]?.length; i++) {
			colors.push(getColor(finalPairs[index][i].types))
		}
		return colors
	}

	//вывод расписания на неделю
	return (
		<Tab.Navigator
			initialRouteName={getWeekDay()}
			screenOptions={{ tabBarStyle: { backgroundColor: '#e9e9e9' } }}
		>
			{days.map((item, index) => (
				<Tab.Screen
					key={index}
					name={item}
					options={{
						tabBarLabel: () => (
							<HeaderDay
								dayWeek={item}
								day={tmpNumbers[index]}
								colorsBalls={getArrayColors(index)}
								// pairCounter={finalPairs?.[index]?.length}
							/>
							//<Ionicons name='location-outline' size={16} color='black' />
						)
					}}
				>
					{props => <Day {...props} dayNumber={index} />}
				</Tab.Screen>

				// <Tab.Screen name={item} component={() => Day(index)} key={index} />
				// <Tab.Screen name={item} key={index}>
				// 	{props => <Day {...props} dayNumber={index} />}
				// </Tab.Screen>
			))}
		</Tab.Navigator>
	)
}

export default DaysNavigation
