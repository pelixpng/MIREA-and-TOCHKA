import React, { FC, useEffect, useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/Navigation.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text } from 'react-native'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { addGroupToRedux } from '../redux/counter'

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>

const StartScreen: FC<Props> = ({ navigation }) => {
	const [group, setGroup] = useState('')

	const value = useReduxSelector(state => state.counter) //получение из хранилища
	const dispatch = useReduxDispatch() //запись в хранилище

	const storeData = async () => {
		try {
			dispatch(addGroupToRedux(group))
			await AsyncStorage.setItem('@currentGroup', group)
			navigation.navigate('Shedule')
		} catch (e) {
			// saving error
		}
	}

	return (
		<View>
			<TextInput
				placeholder='Напиши группу'
				onChangeText={setGroup}
				style={{ fontSize: 50 }}
			/>
			<Button title='Далее' onPress={storeData} />

			{/* <Button title='+1' onPress={() => dispatch(increment(1))} />
			<Button title='-1' onPress={() => dispatch(decrement(1))} /> */}
			<Text style={{ fontSize: 30 }}>Группа в Redux: {value}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default StartScreen
