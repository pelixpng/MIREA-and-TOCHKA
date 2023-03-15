import { createStackNavigator } from '@react-navigation/stack'
import { FeedBack } from '../screens/Feedback'
import Settings from '../screens/Settings'
import { SettingsStackParamList } from '../types/Navigation.types'
import { MainRoutes, SettingsRoutes } from './Routes'
import React, { FC } from 'react'
import { AboutApp } from '../screens/AboutApp'
import { ChangeTheme } from '../screens/ChangeTheme'

const SettingsStack = createStackNavigator<SettingsStackParamList>()

export const SettingsNavigation: FC = () => {
	return (
		<SettingsStack.Navigator
			initialRouteName={SettingsRoutes.Settings}
			screenOptions={{
				headerStyle: { backgroundColor: '#e9e9e9' },
				headerTitleStyle: {
					color: '#adadae',
					fontSize: 30,
					fontWeight: '100'
				}
			}}
		>
			<SettingsStack.Screen
				name={MainRoutes.Settings}
				component={Settings}
				options={{ title: 'Настройки', headerShown: false }}
			/>
			<SettingsStack.Screen
				name={SettingsRoutes.FeedBack}
				component={FeedBack}
				options={{
					title: 'Обратная связь',
					headerTitleStyle: {
						fontSize: 25,
						fontWeight: '600',
						color: '#adadae'
					}
				}}
			/>
			<SettingsStack.Screen
				name={SettingsRoutes.AboutApp}
				component={AboutApp}
				options={{
					title: 'О приложении',
					headerTitleStyle: {
						fontSize: 25,
						fontWeight: '600',
						color: '#adadae'
					}
				}}
			/>
			<SettingsStack.Screen
				name={SettingsRoutes.ChangeTheme}
				component={ChangeTheme}
				options={{ title: 'Тема' }}
			/>
		</SettingsStack.Navigator>
	)
}
