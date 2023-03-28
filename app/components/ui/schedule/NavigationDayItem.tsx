import React, { FC } from 'react'
import styled from 'styled-components/native'
import { StyledColor } from '../../../types/styled'

interface Props {
	dayWeek: string
	day: string
	colorsBalls: string[]
	focused: boolean
}

export const HeaderDay: FC<Props> = ({
	dayWeek,
	day,
	colorsBalls,
	focused
}) => {
	return (
		<Headercontainer>
			<FocusedHeader bg={focused ? '#fa9292' : '#e9e9e9'}>
				<NumberDay bg={focused ? '#212525' : '#adadae'}>{day}</NumberDay>
				<WeekDay>{dayWeek}</WeekDay>
			</FocusedHeader>
			<BallsContainer>
				{colorsBalls.map((item, index) => (
					<Ball key={index} bg={item} />
				))}
			</BallsContainer>
		</Headercontainer>
	)
}

const Headercontainer = styled.View`
	align-items: center;
	min-width: 54px;
	min-height: auto;
`

const FocusedHeader = styled.View<StyledColor>`
	align-items: center;
	min-width: 68%;
	min-height: auto;
	background-color: ${props => props.bg};
	border-radius: 11px;
`

const BallsContainer = styled.View`
	margin-top: 3px;
	flex-direction: row;
	max-width: 60;
	min-height: 7px;
	justify-content: space-between;
`
const Ball = styled.View<StyledColor>`
	width: 7px;
	height: 7px;
	background-color: ${props => props.bg};
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
const NumberDay = styled.Text<StyledColor>`
	min-height: auto;
	min-width: auto;
	font-size: 16;
	font-weight: bold;
	color: ${props => props.bg};
`
