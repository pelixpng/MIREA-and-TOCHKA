import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Settings from '../screens/Settings'
import { MainRoutes } from './Routes'
import DaysNavigation from './DaysNavigation'
import { SelectMireaMap } from './MapNavigation'
import { FindTeacher } from '../screens/FindTeacher'
const Tab = createBottomTabNavigator()
//навигация между экранами приложения
const BottomNavigation: FC = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarHideOnKeyboard: true
			}}
		>
			<Tab.Screen
				name={MainRoutes.Shedule}
				component={DaysNavigation}
				options={{ headerShown: false, title: 'Bottom расписание' }}
			/>
			<Tab.Screen
				name={MainRoutes.FindTeacher}
				component={FindTeacher}
				options={{ headerShown: false, title: 'Поиск препода' }}
			/>
			<Tab.Screen
				name={MainRoutes.SelectMireaMap}
				component={SelectMireaMap}
				options={{ headerShown: false, title: 'Карта' }}
			/>
			<Tab.Screen
				name={MainRoutes.Settings}
				component={Settings}
				options={{ headerShown: false, title: 'Настройки' }}
			/>
		</Tab.Navigator>
	)
}

export default BottomNavigation
