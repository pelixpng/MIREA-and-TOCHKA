import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../types/Navigation.types'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavigation from './BottomNavigation'
import StartScreen from '../screens/StartScreen'
import { MainRoutes } from './Routes'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { Text } from 'react-native'
import React, { useEffect } from 'react'
import { NetInfoState, useNetInfo } from '@react-native-community/netinfo'
import { addIsAppOfflineToRedux } from '../redux/counter'
import { FeedBack } from '../screens/Feedback'
import { HeaderSchedule } from '../components/ui/HeaderSchedule'
import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics
} from 'react-native-safe-area-context'
import Settings from '../screens/Settings'
import { SettingsNavigation } from './SettingsNavigation'

const Stack = createStackNavigator<RootStackParamList>()

interface Props {
	isAuth: boolean
}

export function Navigation({ isAuth }: Props) {
	const dispatch = useReduxDispatch() // для записи в Redux
	const internetState: NetInfoState = useNetInfo() //проверка подключения к интернету
	const mainGroup = useReduxSelector(state => state.counter.group)
	const mainWeek = useReduxSelector(state => state.counter.week)
	useEffect(() => {
		if (internetState.isConnected == true) {
			dispatch(addIsAppOfflineToRedux(false))
		} else if (internetState.isConnected == false) {
			dispatch(addIsAppOfflineToRedux(true))
		}
	}, [internetState.isConnected])

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={isAuth ? MainRoutes.Shedule : MainRoutes.StartScreen}
			>
				<Stack.Screen
					name={MainRoutes.StartScreen}
					component={StartScreen}
					options={{ title: 'Выбор группы' }}
				/>
				<Stack.Screen
					name={MainRoutes.Shedule}
					component={BottomNavigation}
					options={{
						header: () => (
							<SafeAreaView>
								<HeaderSchedule />
							</SafeAreaView>
						)
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
