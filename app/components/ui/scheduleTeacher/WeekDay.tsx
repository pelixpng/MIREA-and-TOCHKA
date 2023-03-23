import React, { FC } from 'react'
import styled from 'styled-components/native'

export const WeekDayItem: FC<{ Day: string }> = ({ Day }) => {
	return (
		<TextDayContainer>
			<DayName>{Day}</DayName>
		</TextDayContainer>
	)
}

const TextDayContainer = styled.View`
	padding: 10px;
	border-radius: 20px;
	background-color: #ffb6b6;
	margin-top: 20px;
	width: 97%;
	align-self: center;
	align-items: center;
`
const DayName = styled.Text`
	width: auto;
	height: auto;
	font-weight: 600;
	font-size: 20px;
	color: rgba(33, 37, 37, 0.83);
`
