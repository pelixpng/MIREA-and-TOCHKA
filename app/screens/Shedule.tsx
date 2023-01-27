import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { FC } from 'react'
import { Button, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import Settings from './Settings'
import { StyleSheet } from 'react-native'
import { useReduxSelector } from '../redux'

const Tab = createBottomTabNavigator()

const Shedule: FC = () => {
	const value = useReduxSelector(state => state.counter)

	return (
		<View>
			<Text style={{ fontSize: 30, textAlign: 'center' }}>
				ТУТ БУДЕТ РАСПИСАНИЕ
			</Text>
			<Text style={{ fontSize: 30 }}>Группа в Redux: {value}</Text>
			{/* <Button title='Стереть кэш' /> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	}
})

export default Shedule
