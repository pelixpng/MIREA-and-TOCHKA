import React, { FC } from 'react'
import styled from 'styled-components/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SettingsStackParamList } from '../../../types/Navigation.types'
import { MainButton } from '../../UniversalComponents'

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
		<MainButton bg='white' onPress={() => navigation.navigate(routeName)}>
			<Title>{name}</Title>
		</MainButton>
	)
}

const Title = styled.Text`
	width: auto;
	height: auto;
	font-weight: 600;
	font-size: 20px;
	color: rgba(33, 37, 37, 0.83);
`
