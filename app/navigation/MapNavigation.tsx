import { MapRoutes } from './Routes'
import { OnlineMap } from '../components/MapMireaOnline'
import React, { FC } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { OfflineMap } from '../components/MapMireaSvg'
import { NetInfoState, useNetInfo } from '@react-native-community/netinfo'

//const MapNav = createStackNavigator<MireaMapStackParamList>()
const MapNav = createMaterialTopTabNavigator()
export const SelectMireaMap: FC = () => {
	const internetState: NetInfoState = useNetInfo() //проверка подключения к интернету

	return (
		<MapNav.Navigator
			initialRouteName={
				internetState.isConnected ? MapRoutes.OnlineMap : MapRoutes.OfflineMap
			}
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
