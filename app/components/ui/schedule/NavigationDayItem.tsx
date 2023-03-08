import { FC } from 'react'
import styled from 'styled-components/native'

export const HeaderDay: FC<{
	dayWeek: string
	day: string
	colorsBalls: string[]
	focused: boolean
}> = ({ dayWeek, day, colorsBalls, focused }) => {
	return (
		<Headercontainer>
			<FocusedHeader testID={focused ? '#fa9292' : '#e9e9e9'}>
				<NumberDay testID={focused ? '#212525' : '#adadae'}>{day}</NumberDay>
				<WeekDay>{dayWeek}</WeekDay>
			</FocusedHeader>
			<BallsContainer>
				{colorsBalls.map(item => (
					<Ball key={Math.random().toString().substring(3, 8)} testID={item} />
				))}
			</BallsContainer>
		</Headercontainer>
	)
}

const Headercontainer = styled.View`
	align-items: center;
	width: 54px;
	min-height: auto;
`

const FocusedHeader = styled.View`
	align-items: center;
	min-width: 68%;
	min-height: auto;
	background-color: ${props => props.testID};
	border-radius: 11px;
`

const BallsContainer = styled.View`
	margin-top: 3px;
	flex-direction: row;
	max-width: 60;
	min-height: auto;
	justify-content: space-between;
`
const Ball = styled.View`
	width: 7px;
	height: 7px;
	background-color: ${props => props.testID};
	border-radius: 100px;
	margin: 1px;
`

const WeekDay = styled.Text`
	text-align: center;
	min-height: auto;
	min-width: auto;
	font-size: 20;
	font-weight: bold;
	color: #212525;
`
const NumberDay = styled.Text`
	//text-align: center;
	min-height: auto;
	min-width: auto;
	font-size: 16;
	font-weight: bold;
	color: ${props => props.testID};
`
