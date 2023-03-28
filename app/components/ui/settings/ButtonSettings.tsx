import React, { FC } from 'react'
import styled from 'styled-components/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SettingsStackParamList } from '../../../types/Navigation.types'

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
		<ButtonContainer onPress={() => navigation.navigate(routeName)}>
			<Title>{name}</Title>
		</ButtonContainer>
	)
}

const ButtonContainer = styled.TouchableOpacity`
	padding: 10px;
	border-radius: 20px;
	background-color: #ffffff;
	margin-top: 20px;
	width: 97%;
	align-self: center;
	align-items: center;
`
const Title = styled.Text`
	width: auto;
	height: auto;
	font-weight: 600;
	font-size: 20px;
	color: rgba(33, 37, 37, 0.83);
`
