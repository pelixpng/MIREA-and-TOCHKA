import { FC, useState } from 'react'
import { Text, View } from 'react-native'
import { Button, TextInput } from 'react-native'
import { useReduxSelector, useReduxDispatch } from '../redux'
import { addScheduleParsToRedux, addScheduleToRedux } from '../redux/counter'
import StorageService from '../Storage/Storage'
import ApiService from '../api/MireaApi'
import { ButtonParser } from '../api/TestApiPars'
//import { ButtonParser } from '../api/TestApiPars'
import { parsSchedule } from '../api/ParserApi'

const Settings: FC = () => {
	const [group, setGroup] = useState('')
	const value = useReduxSelector(state => state.counter.group) //получение из хранилища
	const mainWeek = useReduxSelector(state => state.counter.week)
	const mainScheduleJson = useReduxSelector(state => state.counter.schedule)
	const finalPars = useReduxSelector(state => state.counter.schedulePars)
	const dispatch = useReduxDispatch() //запись в хранилище
	const changeGroup = async () => {
		try {
			await StorageService.storeData(dispatch, '@currentGroup', group)
			const updateSchedule = await ApiService.full_schedule(group)
			const tmp = parsSchedule(mainWeek, updateSchedule)
			dispatch(addScheduleParsToRedux(tmp))
		} catch (e) {
			console.log(e)
		}
	}

	const getSaveParsDchedule = () => {
		console.log(finalPars)
	}

	return (
		<View>
			<TextInput
				placeholder={value}
				onChangeText={setGroup}
				style={{ fontSize: 50 }}
			/>
			<Button title='Изменить группу' onPress={changeGroup} />
			<Button title='Стереть кэш' onPress={StorageService.delData} />
			<Button
				title='Печать в консоль'
				onPress={getSaveParsDchedule}
				color='green'
			></Button>
			{/* <ButtonParser /> */}
		</View>
	)
}

export default Settings
