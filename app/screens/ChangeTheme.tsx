import React, { FC } from 'react'
import {
	BackgroundContainer,
	DynamicButton,
	DynamicButtonTitle
} from '../components/UniversalComponents'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ThemeSettings } from '../types/ThemeSettings.types'
import StorageServiceMMKV from '../storage/Storage'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { addThemeSettingsToRedux, addThemeToRedux } from '../redux/counter'
import { useColorScheme } from 'react-native'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import { StyledColor } from '../types/styled'
//import { addThemeToRedux } from '../redux/counter'
export const ChangeTheme: FC = () => {
	//const [themeSettings, setThemeSettings] = useState<ThemeSettings>('Тёмная')
	const nameButton: ThemeSettings[] = ['Тёмная', 'Светлая', 'Системная']
	const colorScheme = useColorScheme()
	const theme: DefaultTheme = useTheme()
	const themeSettingsRedux = useReduxSelector(
		state => state.counter.themeSettings
	)
	const dispatch = useReduxDispatch() //запись в хранилище

	const setTheme = (title: ThemeSettings) => {
		StorageServiceMMKV.saveThemeSettings(title)
		if (title == 'Светлая') {
			dispatch(addThemeSettingsToRedux('Светлая'))
			dispatch(addThemeToRedux('light'))
		} else if (title == 'Тёмная') {
			dispatch(addThemeSettingsToRedux('Тёмная'))
			dispatch(addThemeToRedux('dark'))
		} else {
			dispatch(addThemeSettingsToRedux('Системная'))
			if (colorScheme != null && colorScheme != undefined) {
				dispatch(addThemeToRedux(colorScheme))
			} else {
				dispatch(addThemeToRedux('light'))
			}
		}
	}

	const ThemeButton: FC<{ title: ThemeSettings }> = ({ title }) => {
		return (
			<DynamicButton
				bg={
					themeSettingsRedux == title
						? theme.colors.focusedDay
						: theme.colors.backgroundSubject
				}
				onPress={() => {
					setTheme(title)
				}}
			>
				<DynamicButtonTitle>{title}</DynamicButtonTitle>
			</DynamicButton>
		)
	}

	return (
		<BackgroundContainer height='100%'>
			<MaterialCommunityIcons
				name='theme-light-dark'
				size={100}
				color='#adadae'
				style={{ alignSelf: 'center' }}
			/>
			{nameButton.map((item, index) => (
				<ThemeButton title={item} key={index} />
			))}
		</BackgroundContainer>
	)
}
