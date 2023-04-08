import { createStackNavigator } from '@react-navigation/stack'
import { FeedBack } from '../screens/Feedback'
import Settings from '../screens/Settings'
import { SettingsStackParamList } from '../types/Navigation.types'
import { MainRoutes, SettingsRoutes } from './Routes'
import React, { FC } from 'react'
import { AboutApp } from '../screens/AboutApp'
import { ChangeTheme } from '../screens/ChangeTheme'
import { DefaultTheme, useTheme } from 'styled-components/native'

const SettingsStack = createStackNavigator<SettingsStackParamList>()

export const SettingsNavigation: FC = () => {
	const theme: DefaultTheme = useTheme()
	return (
		<SettingsStack.Navigator
			initialRouteName={SettingsRoutes.Settings}
			screenOptions={{
				headerTintColor: theme.colors.dopWeekText,
				headerStyle: {
					backgroundColor: theme.colors.backgroundApp,
					elevation: 0
				}
			}}
		>
			<SettingsStack.Screen
				name={MainRoutes.Settings}
				component={Settings}
				options={{
					title: 'Настройки',
					headerShown: false
				}}
			/>
			<SettingsStack.Screen
				name={SettingsRoutes.FeedBack}
				component={FeedBack}
				options={{
					title: ''
				}}
			/>
			<SettingsStack.Screen
				name={SettingsRoutes.AboutApp}
				component={AboutApp}
				options={{
					title: ''
				}}
			/>
			<SettingsStack.Screen
				name={SettingsRoutes.ChangeTheme}
				component={ChangeTheme}
				options={{
					title: ''
				}}
			/>
		</SettingsStack.Navigator>
	)
}
