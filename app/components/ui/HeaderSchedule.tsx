import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'
import { FC } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { MainRoutes } from '../../navigation/Routes'
import { useReduxSelector } from '../../redux'
import { RootStackParamList } from '../../types/Navigation.types'

export const HeaderSchedule: FC = () => {
	const mainGroup = useReduxSelector(state => state.counter.group)
	const mainWeek = useReduxSelector(state => state.counter.week)
	const nav = useNavigation()
	return (
		<HView>
			<StyledView>
				<WeekText>{mainWeek}</WeekText>
				<DopWeekText>Неделя Семестра</DopWeekText>
				<ButtonContainer
					onPress={() =>
						console.log('Переход в режим смены группы еще не готов')
					}
				>
					<ButtonText>{mainGroup}</ButtonText>
				</ButtonContainer>
			</StyledView>
		</HView>
	)
}

// Create a Title component that'll render an <h1> tag with some styles

const HView = styled.View`
	height: 60px;
	background: #e9e9e9;
`

const StyledView = styled.View`
	background: #e9e9e9;
	flex-direction: row;
	height: 60px;
	width: 95%;
	align-self: center;
`

const DopWeekText = styled.Text`
	width: 115px;
	height: 50px;
	left: 1px;
	top: 2px;
	font-weight: 400;
	font-size: 25px;
	line-height: 28px;
	color: #adadae;
`

const WeekText = styled.Text`
	color: #212525;
	width: 32px;
	height: 50px;
	top: 1px;
	font-weight: 500;
	font-size: 64px;
	line-height: 66px;
`

const ButtonContainer = styled.TouchableOpacity`
	top: 5px;
	width: 120px;
	height: 43px;
	border-radius: 10px;
	background-color: rgba(0, 255, 144, 0.2);
	margin-left: auto;
	right: 1px;
`
const ButtonText = styled.Text`
	font-size: 23px;
	text-align: center;
	color: #4dc591;
	opacity: 1;
	font-weight: 500;
	line-height: 45px;
`
// Create a Wrapper component that'll render a <section> tag with some styles
