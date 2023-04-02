import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { useColorScheme } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { MainRoutes, SettingsRoutes } from '../../navigation/Routes'
import { useReduxSelector } from '../../redux'
import { DarkTheme, LightTheme } from '../Themes'
import { BackgroundContainer } from '../UniversalComponents'

export const HeaderSchedule: FC = () => {
	const mainGroup = useReduxSelector(state => state.counter.group)
	const mainWeek = useReduxSelector(state => state.counter.week)
	const nav = useNavigation()
	const title = 'Неделя\nСеместра'
	return (
		<BackgroundContainer height='auto'>
			<HeaderContainer>
				<WeekText>{mainWeek}</WeekText>
				<DopWeekText>{title}</DopWeekText>
				<ButtonGroupContainer
					onPress={() =>
						nav.navigate(SettingsRoutes.Settings, {
							screen: MainRoutes.Settings
						})
					}
				>
					<ButtonGroupText>{mainGroup}</ButtonGroupText>
				</ButtonGroupContainer>
			</HeaderContainer>
		</BackgroundContainer>
	)
}

const HeaderContainer = styled.View`
	//background: #e9e9e9;
	background: ${props => props.theme.backgroundColor};
	flex-direction: row;
	width: 95%;
	align-self: center;
`

const DopWeekText = styled.Text`
	width: auto;
	height: auto;
	left: 4px;
	top: 2px;
	font-weight: 400;
	font-size: 25px;
	line-height: 28px;
	color: #adadae;
`

const WeekText = styled.Text`
	color: #212525;
	width: auto;
	height: auto;
	top: 1px;
	font-weight: 500;
	font-size: 64px;
	line-height: 66px;
`

const ButtonGroupContainer = styled.TouchableOpacity`
	top: 5px;
	width: auto;
	height: 46px;
	border-radius: 10px;
	background-color: rgba(0, 255, 144, 0.2);
	margin-left: auto;
	right: 1px;
`
const ButtonGroupText = styled.Text`
	font-size: 23px;
	text-align: center;
	color: #4dc591;
	font-weight: 500;
	line-height: 46px;
	margin-right: 2%;
	margin-left: 2%;
`
