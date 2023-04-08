import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainRoutes } from './Routes'
import DaysNavigation from './DaysNavigation'
import { SelectMireaMap } from './MapNavigation'
import { FindTeacher } from '../screens/FindTeacher'
import { SettingsNavigation } from './SettingsNavigation'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { DefaultTheme, useTheme } from 'styled-components/native'

const Tab = createBottomTabNavigator()
const BottomNavigation: FC = () => {
	const theme: DefaultTheme = useTheme()
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: theme.colors.focusedDay,
				tabBarInactiveTintColor: '#88889D',
				tabBarStyle: {
					backgroundColor: theme.colors.backgroundSubject,
					borderTopWidth: 0
				}
			}}
		>
			<Tab.Screen
				name={MainRoutes.Shedule}
				component={DaysNavigation}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
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
					tabBarShowLabel: false,
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
					tabBarShowLabel: false,
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
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => (
						<AntDesign name='setting' size={24} color={color} />
					)
				}}
			/>
		</Tab.Navigator>
	)
}

export default BottomNavigation
