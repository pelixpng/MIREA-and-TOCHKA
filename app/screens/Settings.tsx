import { FC } from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Button, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useReduxSelector } from '../redux'

const Settings: FC = () => {
	const value = useReduxSelector(state => state.counter)
	const delData = async () => {
		try {
			await AsyncStorage.clear()
		} catch (e) {
			// saving error
		}
	}
	return (
		<View>
			<Text style={{ fontSize: 30, textAlign: 'center' }}>
				ТУТ БУДУТ НАСТРОЙКИ
			</Text>
			<Text style={{ fontSize: 30 }}>Группа в Redux: {value}</Text>
			<Button title='Стереть кэш' onPress={delData} />
		</View>
	)
}

export default Settings
