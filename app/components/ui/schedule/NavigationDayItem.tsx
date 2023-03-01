import { FC } from 'react'
import styled from 'styled-components/native'

export const HeaderDay: FC<{
	dayWeek: string
	day: string
	colorsBalls: string[]
}> = ({ dayWeek, day, colorsBalls }) => {
	return (
		<Headercontainer>
			<WeekDay>{dayWeek}</WeekDay>
			<WeekDay>{day}</WeekDay>
			{/* <WeekDay>{pairCounter}</WeekDay> */}
			<BallsContainer>
				{colorsBalls.map(item => (
					<Ball testID={item} />
				))}
			</BallsContainer>
		</Headercontainer>
	)
}

const Headercontainer = styled.View`
	align-items: center;
	width: 40px;
	height: 70px;
`

const BallsContainer = styled.View`
	flex-direction: row;
	width: 40px;
`
const Ball = styled.View`
	width: 7px;
	height: 7px;
	background-color: ${props => props.testID};
	border-radius: 100px;
`

const WeekDay = styled.Text`
	width: 30px;
	min-height: 18px;
	font-size: 20;
`
