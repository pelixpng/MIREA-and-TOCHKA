import React, { FC } from 'react'
import { Linking } from 'react-native'
import styled from 'styled-components/native'
import {
	documentationApi,
	feedBack,
	offlineMap,
	onlineMap
} from '../constant/links'
import {
	ScrollContainer,
	MainButton,
	MainButtonTitle,
	DelimiterContainer
} from '../components/UniversalComponents'

export const AboutApp: FC = () => {
	return (
		<ScrollContainer>
			<LogoContainer
				style={{ marginTop: 10 }}
				source={require('../../assets/icon.png')}
			/>
			<VersionText>Версия 1.0.0 от 22 марта 2023 г.</VersionText>
			<DelimiterContainer>
				<MainButtonTitle>Используемые ресурсы</MainButtonTitle>
			</DelimiterContainer>
			<MainButton onPress={() => Linking.openURL(documentationApi)}>
				<MainButtonTitle>API by Mirea Ninja</MainButtonTitle>
			</MainButton>
			<MainButton onPress={() => Linking.openURL(onlineMap)}>
				<MainButtonTitle>Онлайн карта</MainButtonTitle>
			</MainButton>
			<MainButton onPress={() => Linking.openURL(offlineMap)}>
				<MainButtonTitle>Офлайн карта</MainButtonTitle>
			</MainButton>
			<DelimiterContainer>
				<MainButtonTitle>Разработчики</MainButtonTitle>
			</DelimiterContainer>
			<MainButton onPress={() => Linking.openURL(feedBack)}>
				<MainButtonTitle>Семён Кузьмин</MainButtonTitle>
			</MainButton>
		</ScrollContainer>
	)
}

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
