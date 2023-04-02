import React, { FC } from 'react'
import { Linking } from 'react-native'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { feedBack } from '../constant/links'
import {
	BackgroundContainer,
	MainButton,
	MainButtonTitle
} from '../components/UniversalComponents'

export const FeedBack: FC = () => {
	const description =
		'		Если у вас возникли проблемы во время использования приложения, вы можете связаться с разработчиком через почту или телеграмм.'
	return (
		<BackgroundContainer height='100%'>
			<MaterialCommunityIcons
				name='chat-question'
				size={100}
				color='#adadae'
				style={{ alignSelf: 'center' }}
			/>
			<TextInfoContainer>
				<TextInfo>{description}</TextInfo>
			</TextInfoContainer>
			<MainButton bg='white' onPress={() => Linking.openURL(feedBack)}>
				<MainButtonTitle>Telegram </MainButtonTitle>
			</MainButton>
			<MainButton
				bg='white'
				onPress={() => Linking.openURL('mailto:semeonky@gmail.com')}
			>
				<MainButtonTitle>Почта </MainButtonTitle>
			</MainButton>
		</BackgroundContainer>
	)
}

const TextInfoContainer = styled.View`
	padding: 10px;
	border-radius: 10px;
	background-color: #ffffff;
	margin-top: 20px;
	width: 97%;
	align-self: center;
	align-items: center;
`

const TextInfo = styled.Text`
	width: 100%;
	height: auto;
	font-weight: 500;
	font-size: 17px;
	text-align: justify;
	color: rgba(33, 37, 37, 0.83);
`
