import React, { FC } from 'react'
import { Button, Linking, View } from 'react-native'
import styled from 'styled-components/native'

export const FeedBack: FC = () => {
	const description =
		'		Если у вас возникли проблемы при использовании приложения, вы можете связаться с разработчиком через почту или телеграмм.'
	return (
		<View>
			<TextInfoContainer>
				<TextInfo>{description}</TextInfo>
			</TextInfoContainer>
			<ButtonContainer
				onPress={() => Linking.openURL('https://t.me/paveldur0')}
			>
				<Title>Telegram </Title>
			</ButtonContainer>
			<ButtonContainer
				onPress={() => Linking.openURL('mailto:semeonky@gmail.com')}
			>
				<Title>Почта </Title>
			</ButtonContainer>
			{/* <Button
				title='telegram'
				onPress={() => Linking.openURL('https://t.me/paveldur0')}
			></Button> */}
		</View>
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
	//line-height: 23px;
	color: rgba(33, 37, 37, 0.83);
`

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

	//line-height: 23px;
	color: rgba(33, 37, 37, 0.83);
`
