import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../types/Navigation.types'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavigation from './BottomNavigation'
import StartScreen from '../screens/StartScreen'
import { MainRoutes } from './Routes'
import DaysNavigation from './DaysNavigation'
import { useReduxSelector } from '../redux'
import { Text } from 'react-native'
const Stack = createStackNavigator<RootStackParamList>()

interface Props {
	isAuth: boolean
}

export function Navigation({ isAuth }: Props) {
	const mainGroup = useReduxSelector(state => state.counter.group)
	const mainWeek = useReduxSelector(state => state.counter.week)
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
						title: mainGroup,
						headerRight: () => (
							<Text style={{ marginRight: 16 }}>{mainWeek + ' неделя'}</Text>
						)
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

// export function Navigation({ isAuth }: Props) {
// 	return (
// 		<NavigationContainer>
// 			<DaysNavigation />
// 		</NavigationContainer>
// 	)
// }
