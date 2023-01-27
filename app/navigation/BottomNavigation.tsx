import { FC } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Shedule from '../screens/Shedule'
import Settings from '../screens/Settings'
import { MainRoutes } from './Routes'

const Tab = createBottomTabNavigator()

const BottomNavigation: FC = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name={MainRoutes.Shedule}
				component={Shedule}
				options={{ headerShown: false, title: 'Bottom расписание' }}
			/>
			<Tab.Screen
				name={MainRoutes.Settings}
				component={Settings}
				options={{ headerShown: false, title: 'Bottom настройки' }}
			/>
		</Tab.Navigator>
	)
}

export default BottomNavigation
