import React from 'react'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { getColor } from '../../../utilities/ColorPair'
import { StyledColor } from '../../../types/styled'
import {
	SubjectContainer,
	NameSubjectText,
	TimeSubjectText,
	TypePairText,
	TypePair,
	TypeContainer,
	TimeContainer,
	RoomText,
	NameContainer,
	TimeAndNameContainer,
	TeacherText
} from '../../UniversalComponents'

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
	key: string
}

export const Subject = ({ data }: Props) => {
	const theme: DefaultTheme = useTheme()
	const { time_start, time_end, name, rooms, teachers, types } = data
	return (
		<SubjectContainer>
			<TimeAndNameContainer>
				<TimeContainer>
					<TimeSubjectText>{time_start + '\n' + time_end}</TimeSubjectText>
				</TimeContainer>
				<NameContainer>
					<NameSubjectText>{name}</NameSubjectText>
				</NameContainer>
			</TimeAndNameContainer>
			<InfoContainer>
				<TypeContainer>
					<TypePair bg={getColor(types)}>
						<TypePairText>{types}</TypePairText>
					</TypePair>
				</TypeContainer>
				<RoomAndTeacherContainer>
					<RoomContainer>
						<Ionicons
							name='location-outline'
							size={16}
							color={theme.colors.minorText}
						/>
						{/* кондишнл рендеринг и всегда используй === вместо == */}
						{/* {rooms ? (
							<RoomText>
								{rooms == undefined
									? ''
									: rooms.toLocaleUpperCase().split('.')[1]}
							</RoomText>
						) : null} */}

						{rooms && (
							<RoomText>{rooms.toLocaleUpperCase().split('.')[1]}</RoomText>
						)}

						{/* <RoomText>{rooms == undefined ? '' : rooms.split('.')[1]}</RoomText> */}
					</RoomContainer>
					<TeacherContainer>
						<Ionicons
							name='person-outline'
							size={16}
							color={theme.colors.minorText}
						/>
						<TeacherText>{teachers}</TeacherText>
					</TeacherContainer>
				</RoomAndTeacherContainer>
			</InfoContainer>
		</SubjectContainer>
	)
}

export default Subject

const InfoContainer = styled.View`
	margin-top: 4px;
	width: 100%;
	min-height: 30px;
	flex-direction: row;
`

const RoomAndTeacherContainer = styled.View`
	align-items: center;
	width: 81%;
	min-height: 13px;
	flex-direction: row;
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
