import React, { FC } from 'react'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
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
	const theme: DefaultTheme = useTheme()
	return (
		<Headercontainer>
			<FocusedHeader
				bg={focused ? theme.colors.focusedDay : theme.colors.headerDayItem}
			>
				<NumberDay bg={focused ? 'white' : theme.colors.numberDayText}>
					{day}
				</NumberDay>
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
	font-weight: 400;
	color: ${props => props.theme.colors.weekDayText};
`
const NumberDay = styled.Text<StyledColor>`
	min-height: auto;
	min-width: auto;
	font-size: 17;
	font-weight: 450;
	color: ${props => props.bg};
`
