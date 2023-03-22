import React, { FC } from 'react'
import { Linking, View } from 'react-native'
import styled from 'styled-components/native'
import { ButtonContainer } from './Feedback'
import { Title } from './Feedback'

export const AboutApp: FC = () => {
	return (
		<View style={{ backgroundColor: '#e9e9e9', height: '100%' }}>
			<ScrollContainer>
				<LogoContainer
					style={{ marginTop: 10 }}
					//C:\mirea\MireaTypeScript\assets\adaptive-icon.png
					source={require('../../assets/icon.png')}
				/>
				<VersionText>Версия 1.0.0 от 1 апреля 2023 г.</VersionText>
				<HeaderContainer>
					<HeaderName>Используемые ресурсы</HeaderName>
				</HeaderContainer>
				<ButtonContainer
					onPress={() => Linking.openURL('https://schedule.mirea.ninja/docs')}
				>
					<Title>API by Mirea Ninja</Title>
				</ButtonContainer>
				<ButtonContainer
					onPress={() =>
						Linking.openURL('https://ischemes.ru/group/rtu-mirea/vern78')
					}
				>
					<Title>Онлайн карта</Title>
				</ButtonContainer>
				<ButtonContainer
					onPress={() => Linking.openURL('https://mirea.xyz/scheme')}
				>
					<Title>Офлайн карта</Title>
				</ButtonContainer>
				<HeaderContainer>
					<HeaderName>Разработчики</HeaderName>
				</HeaderContainer>
				<ButtonContainer
					onPress={() => Linking.openURL('https://t.me/paveldur0')}
				>
					<Title>Семён Кузьмин</Title>
				</ButtonContainer>
			</ScrollContainer>
		</View>
	)
}

const ScrollContainer = styled.ScrollView``

const LogoContainer = styled.Image`
	align-self: center;
	width: 150;
	height: 150;
	border-radius: 10;
`
const VersionText = styled.Text`
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
	color: #adadae;
	align-self: center;
	margin-top: 10;
`
const HeaderContainer = styled.View`
	padding: 10px;
	border-radius: 20px;
	background-color: #ffb6b6;
	margin-top: 20px;
	width: 97%;
	align-self: center;
	align-items: center;
`
const HeaderName = styled.Text`
	width: auto;
	height: auto;
	font-weight: 600;
	font-size: 20px;
	//line-height: 23px;
	color: rgba(33, 37, 37, 0.83);
`
