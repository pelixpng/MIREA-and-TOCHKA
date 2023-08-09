import React, { FC } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Day from '../components/ui/schedule/Day'
import { getWeekDay } from '../utilities/GetWeekDay'
import { HeaderDay } from '../components/ui/schedule/NavigationDayItem'
import { getColor } from '../utilities/ColorPair'
import { useReduxSelector } from '../redux'
import { GetCurrentDayWeek } from '../utilities/GetDateInWeek'
import { DefaultTheme, useTheme } from 'styled-components/native'

const Tab = createMaterialTopTabNavigator()

const DaysNavigation: FC = () => {
	const theme: DefaultTheme = useTheme()
	const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
	const tmpNumbers = GetCurrentDayWeek()
	const finalPairs = useReduxSelector(state => state.counter.schedulePars)
	function getArrayColors(index: number) {
		const colors: string[] = []
		for (let i = 0; i < finalPairs?.[index]?.length; i++) {
			colors.push(getColor(finalPairs[index][i].types))
		}
		return colors
	}

	return (
		<Tab.Navigator
			initialRouteName={getWeekDay()}
			screenOptions={{
				tabBarStyle: { backgroundColor: theme.colors.backgroundApp }
			}}
		>
			{days.map((item, index) => (
				<Tab.Screen
					key={index}
					name={item}
					options={{
						tabBarLabel: ({ focused }) => (
							<HeaderDay
								dayWeek={item}
								day={tmpNumbers[index]}
								colorsBalls={getArrayColors(index)}
								focused={focused}
							/>
						),
						tabBarPressColor: 'transparent',
						tabBarIndicatorStyle: {
							opacity: 0
						}
					}}
				>
					{props => <Day {...props} dayNumber={index} />}
				</Tab.Screen>
			))}
		</Tab.Navigator>
	)
}

export default DaysNavigation
