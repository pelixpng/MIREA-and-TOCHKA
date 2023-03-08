import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainRoutes } from './Routes'
import DaysNavigation from './DaysNavigation'
import { SelectMireaMap } from './MapNavigation'
import { FindTeacher } from '../screens/FindTeacher'
import { SettingsNavigation } from './SettingsNavigation'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
const Tab = createBottomTabNavigator()
//навигация между экранами приложения

const BottomNavigation: FC = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: '#FF7648',
				tabBarInactiveTintColor: '#88889D'
			}}
		>
			<Tab.Screen
				name={MainRoutes.Shedule}
				component={DaysNavigation}
				options={{
					headerShown: false,
					title: 'Расписание',
					tabBarIcon: ({ color }) => (
						<AntDesign name='calendar' size={24} color={color} />
					)
				}}
			/>
			<Tab.Screen
				name={MainRoutes.FindTeacher}
				component={FindTeacher}
				options={{
					headerShown: false,
					title: 'Поиск',
					tabBarIcon: ({ color }) => (
						<AntDesign name='search1' size={24} color={color} />
					)
				}}
			/>
			<Tab.Screen
				name={MainRoutes.SelectMireaMap}
				component={SelectMireaMap}
				options={{
					headerShown: false,
					title: 'Карта',
					tabBarIcon: ({ color }) => (
						<Ionicons name='map-outline' size={24} color={color} />
					)
				}}
			/>
			<Tab.Screen
				name={MainRoutes.Settings}
				component={SettingsNavigation}
				options={{
					headerShown: false,
					title: 'Настройки',
					tabBarIcon: ({ color }) => (
						<AntDesign name='setting' size={24} color={color} />
					)
				}}
			/>
		</Tab.Navigator>
	)
}

export default BottomNavigation
