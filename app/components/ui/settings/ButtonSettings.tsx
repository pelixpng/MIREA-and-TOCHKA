import React, { FC } from 'react'
import styled from 'styled-components/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SettingsStackParamList } from '../../../types/Navigation.types'
import { MainButton, MainButtonTitle } from '../../UniversalComponents'

type settingsNavProps = NativeStackScreenProps<
	SettingsStackParamList,
	'Settings'
>

type routeNameType = 'AboutApp' | 'ChangeTheme' | 'FeedBack' | 'Settings'
//TODO: понять
export const SettingsButton: FC<
	settingsNavProps & { name: string; routeName: routeNameType }
> = ({ navigation, name, routeName }) => {
	return (
		<MainButton onPress={() => navigation.navigate(routeName)}>
			<MainButtonTitle>{name}</MainButtonTitle>
		</MainButton>
	)
}
