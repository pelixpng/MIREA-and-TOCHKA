import { createStackNavigator } from '@react-navigation/stack'
import { FeedBack } from '../screens/Feedback'
import Settings from '../screens/Settings'
import { SettingsStackParamList } from '../types/Navigation.types'
import { MainRoutes, SettingsRoutes } from './Routes'
import { FC } from 'react'
import { AboutApp } from '../screens/AboutApp'
import { ChangeTheme } from '../screens/ChangeTheme'

const SettingsStack = createStackNavigator<SettingsStackParamList>()

export const SettingsNavigation: FC = () => {
	return (
		<SettingsStack.Navigator initialRouteName={SettingsRoutes.Settings}>
			<SettingsStack.Screen
				name={MainRoutes.Settings}
				component={Settings}
				options={{ title: 'Настройки' }}
			/>
			<SettingsStack.Screen
				name={SettingsRoutes.FeedBack}
				component={FeedBack}
				options={{ title: 'Обратная связь' }}
			/>
			<SettingsStack.Screen
				name={SettingsRoutes.AboutApp}
				component={AboutApp}
				options={{ title: 'О приложении' }}
			/>
			<SettingsStack.Screen
				name={SettingsRoutes.ChangeTheme}
				component={ChangeTheme}
				options={{ title: 'Тема' }}
			/>
		</SettingsStack.Navigator>
	)
}