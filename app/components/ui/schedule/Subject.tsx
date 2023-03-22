import React from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'

interface Props {
	data: ItemProps
}

export interface ItemProps {
	name: string
	rooms: string
	teachers: string
	time_end: string
	time_start: string
	types: string
}

export function getColor(typePair: string) {
	let color = ''
	switch (typePair) {
		case 'пр':
			color = 'rgba(115, 120, 255, 0.69)'
			break
		case 'лк':
			color = 'rgba(143, 31, 255, 0.69)'
			break
		case 'с/р':
			color = 'rgba(255, 74, 139, 0.69)'
			break
		case 'лаб':
			color = 'rgba(255, 92, 0, 0.7)'
			break
		default:
			color = 'rgba(255, 0, 0, 0.69)'
			break
	}
	return color
}

export const Subject = (props: Props) => {
	const { time_start, time_end, name, rooms, teachers, types } = props.data
	return (
		<SubjectContainer>
			<TimeAndNameContainer>
				<TimeContainer>
					<Time>{time_start + '\n' + time_end}</Time>
				</TimeContainer>
				<NameContainer>
					<Name>{name}</Name>
				</NameContainer>
			</TimeAndNameContainer>
			<InfoContainer>
				<TypeContainer>
					<TypePair testID={getColor(types)}>
						<TypePairText>{types}</TypePairText>
					</TypePair>
				</TypeContainer>
				<RoomAndTeacherContainer>
					<RoomContainer>
						<Ionicons name='location-outline' size={16} color='black' />
						<RoomText>{rooms == undefined ? '' : rooms.split('.')[1]}</RoomText>
						{/* <RoomText>{rooms.split('.')[1]}</RoomText> */}
					</RoomContainer>
					<TeacherContainer>
						<Ionicons name='person-outline' size={16} color='black' />
						<TeacherText>{teachers}</TeacherText>
					</TeacherContainer>
				</RoomAndTeacherContainer>
			</InfoContainer>
		</SubjectContainer>
	)
}

export default Subject

const SubjectContainer = styled.View`
	padding: 10px;
	border-radius: 20px;
	background-color: white;
	margin-top: 20px;
	width: 95%;
	align-self: center;
`

const TimeAndNameContainer = styled.View`
	flex-direction: row;
`

const Time = styled.Text`
	width: auto;
	height: auto;
	font-weight: 500;
	font-size: 16px;
	line-height: 23px;
	color: rgba(33, 37, 37, 0.83);
`

const Name = styled.Text`
	width: 100%;
	font-weight: 600;
	font-size: 20px;
	line-height: 23px;
	color: #212525;
`

const TimeContainer = styled.View`
	width: 19%;
	min-height: 50px;
`

const NameContainer = styled.View`
	width: 81%;
`
const InfoContainer = styled.View`
	margin-top: 4px;
	width: 100%;
	min-height: 30px;
	flex-direction: row;
`
const TypeContainer = styled.View`
	width: 19%;
	height: 30px;
`

const TypePair = styled.View`
	align-items: center;
	width: 65%;
	height: 25px;
	background-color: ${props => props.testID};
	border-radius: 23px;
`

const TypePairText = styled.Text`
	text-align: center;
	width: auto;
	height: auto;
	font-weight: 600;
	font-size: 19px;
	color: #212525;
`

const RoomAndTeacherContainer = styled.View`
	align-items: center;
	width: 81%;
	min-height: 13px;
	flex-direction: row;
`
const RoomText = styled.Text`
	font-weight: 400;
	font-size: 16px;
	text-align: center;
	color: rgba(33, 37, 37, 0.83);
	margin-left: 0px;
`
const TeacherText = styled.Text`
	font-weight: 400;
	font-size: 16px;
	text-align: center;
	color: rgba(33, 37, 37, 0.83);
	margin-left: 5px;
`

const RoomContainer = styled.View`
	flex-direction: row;
	align-items: center;
	min-height: 20px;
	width: 43%;
`
const TeacherContainer = styled.View`
	flex-direction: row;
	align-items: center;
	min-height: 20px;
	width: 57%;
`
