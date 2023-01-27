import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../types/Navigation.types'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavigation from './BottomNavigation'
import StartScreen from '../screens/StartScreen'
import Shedule from '../screens/Shedule'
import { MainRoutes } from './Routes'

const Stack = createStackNavigator<RootStackParamList>()

interface Props {
	isAuth: boolean
}

export function Navigation({ isAuth }: Props) {
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
					options={{ title: 'Расписание' }}
				/>
				{/* <Stack.Screen name='Profile' component={Profile} /> */}
			</Stack.Navigator>
		</NavigationContainer>
	)
}
