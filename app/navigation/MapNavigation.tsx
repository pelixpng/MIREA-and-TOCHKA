import { MapRoutes } from './Routes'
import { OnlineMap } from '../components/MapMireaOnline'
import React, { FC } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { OfflineMap } from '../components/MapMireaSvg'
import { LabelNav } from '../components/ui/Map/MapNavComponent'

const MapNav = createMaterialTopTabNavigator()
export const SelectMireaMap: FC = () => {
	//не удается сделать маршрут по умолчанию онлайн карта, при переключении на офлайн краш, хз это баг экспо или на апк тоже самое
	//надо проверить потом
	return (
		<MapNav.Navigator
			initialRouteName={MapRoutes.OfflineMap}
			screenOptions={{
				swipeEnabled: false,
				tabBarStyle: {
					backgroundColor: '#e9e9e9',
					marginBottom: 0,
					marginTop: 0,
					height: 52
				}
			}}
		>
			<MapNav.Screen
				name={MapRoutes.OnlineMap}
				component={OnlineMap}
				key='1'
				options={{
					tabBarLabel: ({ focused }) => (
						<LabelNav name='НАВИГАТОР' focused={focused} />
					),
					tabBarPressColor: 'transparent',
					tabBarIndicatorStyle: {
						opacity: 0
					}
				}}
			/>
			<MapNav.Screen
				name={MapRoutes.OfflineMap}
				component={OfflineMap}
				key='2'
				options={{
					tabBarLabel: ({ focused }) => (
						<LabelNav name='КАРТА' focused={focused} />
					),
					tabBarPressColor: 'transparent',
					tabBarIndicatorStyle: {
						opacity: 0
					}
				}}
			/>
		</MapNav.Navigator>
	)
}
