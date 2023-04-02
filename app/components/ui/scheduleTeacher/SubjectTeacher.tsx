import React from 'react'
import styled from 'styled-components/native'
import { getColor } from '../../../utilities/ColorPair'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import {
	NameContainer,
	NameSubjectText,
	RoomText,
	SubjectContainer,
	TeacherText,
	TimeAndNameContainer,
	TimeContainer,
	TimeSubjectText,
	TypeContainer,
	TypePair,
	TypePairText
} from '../../UniversalComponents'

interface Props {
	data: TescherItemProps
}

export interface TescherItemProps {
	group: string
	dayWeek: string
	name: string
	rooms: string
	teachers: string
	time_end: string
	time_start: string
	types: string
	weeks: number[]
}

export const TeacherSubject = ({ data }: Props) => {
	const { time_start, time_end, name, rooms, teachers, types, group, weeks } =
		data
	return (
		<SubjectContainer>
			<TypeGroupRoomContainer>
				<TypeContainer>
					<TypePair bg={getColor(types)}>
						<TypePairText>{types}</TypePairText>
					</TypePair>
				</TypeContainer>
				<DayAndGroupContainer>
					<WeeksContainer>
						<AntDesign name='calendar' size={16} color='black' />
						<WeeksText>{weeks.toString()}</WeeksText>
					</WeeksContainer>
					<GroupContainer>
						<Ionicons name='people-outline' size={16} color='black' />
						<GroupText>{group}</GroupText>
					</GroupContainer>
				</DayAndGroupContainer>
			</TypeGroupRoomContainer>
			<TimeAndNameContainer>
				<TimeContainer>
					<TimeSubjectText>{time_start + '\n' + time_end}</TimeSubjectText>
				</TimeContainer>
				<NameContainer>
					<NameSubjectText>{name}</NameSubjectText>
				</NameContainer>
			</TimeAndNameContainer>
			<RoomContainer>
				<Ionicons name='location-outline' size={16} color='black' />
				<RoomText>{rooms.split('.')[1]}</RoomText>
			</RoomContainer>
			<TeacherContainer>
				<Ionicons name='person-outline' size={16} color='black' />
				<TeacherText>{teachers}</TeacherText>
			</TeacherContainer>
		</SubjectContainer>
	)
}

const TypeGroupRoomContainer = styled.View`
	flex-direction: row;
	width: 100%;
	min-height: 10px;
`

const DayAndGroupContainer = styled.View`
	align-items: center;
	width: 81%;
	min-height: 13px;
	flex-direction: row;
`

// const TeacherText = styled.Text`
// 	font-weight: 400;
// 	font-size: 16px;
// 	color: rgba(33, 37, 37, 0.83);
// 	left: 4px;
// `
const TeacherContainer = styled.View`
	flex-direction: row;
	align-items: center;
	min-height: 20px;
	width: 100%;
`
const WeeksContainer = styled.View`
	align-items: center;
	flex-direction: row;
	min-height: 20px;
	width: auto;
`
const RoomContainer = styled.View`
	flex-direction: row;
	align-items: center;
	min-height: 20px;
	width: 60%;
`
const GroupContainer = styled.View`
	align-items: center;
	flex-direction: row;
	min-height: 20px;
	width: 50%;
	left: 10px;
`
const GroupText = styled.Text`
	font-weight: 400;
	font-size: 16px;
	text-align: center;
	color: rgba(33, 37, 37, 0.83);
	margin-left: 4px;
`
const WeeksText = styled.Text`
	font-weight: 400;
	font-size: 16px;
	text-align: center;
	color: rgba(33, 37, 37, 0.83);
	margin-left: 5px;
`
