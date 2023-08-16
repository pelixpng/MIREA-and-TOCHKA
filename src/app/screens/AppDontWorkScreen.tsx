import styled from 'styled-components/native'
import { Platform } from 'react-native'
import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const AppDontWork: FC = () => {
	return (
		<SafeAreaView>
			<ViewContainer>
				<InsideMenuContainer>
					<MenuInsideTextContainer>
						<MenuTitleText>Приложение заработает 1 сентября!</MenuTitleText>
						<MenuDescriptionText>
							До сентября получения расписания со стороны Api Mirea ninja
							недоступно. Не удаляйте приложение, оно скоро заработает.
						</MenuDescriptionText>
					</MenuInsideTextContainer>
				</InsideMenuContainer>
			</ViewContainer>
		</SafeAreaView>
	)
}

export const InsideMenuContainer = styled.View`
	flex-direction: column;
	display: flex;
	width: 93%;
	padding: 20px;
	align-items: flex-start;
	gap: 12px;
	border-radius: 16px;
	background: white;
	align-self: center;
	margin-top: 10px;
	margin-bottom: 10px;
	${Platform.OS === 'android'
		? 'elevation: 4;'
		: 'shadow-color: rgba(0, 0, 0, 0.12); shadow-opacity: 1; shadow-radius: 4px; shadow-offset: 0px 4px;'}
`

export const ViewContainer = styled.View`
	background: white;
	height: 100%;
	width: 100%;
`

export const MenuInsideTextContainer = styled.View`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`
export const MenuTitleText = styled.Text`
	font-size: 20px;
	font-style: normal;
	font-weight: 800;
	line-height: 24px;
	color: black;
`

export const MenuDescriptionText = styled.Text`
	font-size: 14;
	font-style: normal;
	font-weight: 500;
	line-height: 20;
	color: grey;
	margin-top: 5;
`
