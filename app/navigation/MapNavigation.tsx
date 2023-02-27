import { MapRoutes } from './Routes'
import { OnlineMap } from '../components/MapMireaOnline'
import React, { FC } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { OfflineMap } from '../components/MapMireaSvg'

const MapNav = createMaterialTopTabNavigator()
export const SelectMireaMap: FC = () => {
	//не удается сделать маршрут по умолчанию онлайн карта, при переключении на офлайн краш, хз это баг экспо или на апк тоже самое
	//надо проверить потом
	return (
		<MapNav.Navigator
			initialRouteName={MapRoutes.OfflineMap}
			screenOptions={{ swipeEnabled: false }}
		>
			<MapNav.Screen name={MapRoutes.OnlineMap} component={OnlineMap} key='1' />
			<MapNav.Screen
				name={MapRoutes.OfflineMap}
				component={OfflineMap}
				key='2'
			/>
		</MapNav.Navigator>
	)
}
