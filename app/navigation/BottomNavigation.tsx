import { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Settings from '../screens/Settings'
import { MainRoutes } from './Routes'
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons'
import DaysNavigation from './DaysNavigation'
import UniversityMap from '../screens/MapMirea'
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
				name={MainRoutes.Settings}
				component={Settings}
				options={{ headerShown: false, title: 'Bottom настройки' }}
			/>
			<Tab.Screen
				name={MainRoutes.UniversityMap}
				component={UniversityMap}
				options={{ headerShown: false, title: 'Карта' }}
			/>
		</Tab.Navigator>
	)
}

export default BottomNavigation
