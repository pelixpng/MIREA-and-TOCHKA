import SvgPanZoom from 'react-native-svg-pan-zoom'
import React, { FC, useState } from 'react'
import { FLOOR_0, FLOOR_1, FLOOR_2, FLOOR_3, FLOOR_4 } from './FloorMireaMap'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import { StyledColor } from '../types/styled'

const floorsComponents = {
	'0': <FLOOR_0 />,
	'1': <FLOOR_1 />,
	'2': <FLOOR_2 />,
	'3': <FLOOR_3 />,
	'4': <FLOOR_4 />
} as const

type FloorType = keyof typeof floorsComponents

const floors = Object.keys(floorsComponents) as FloorType[]

export const OfflineMap: FC = () => {
	const [currentFloor, setCurrentFloor] = useState<FloorType>('2')
	const theme: DefaultTheme = useTheme()
	const FloorsSelector: FC<{
		floor: (typeof floors)[number]
	}> = ({ floor }) => {
		return (
			<FlorComponent
				onPress={() => setCurrentFloor(floor)}
				bg={
					currentFloor == floor
						? theme.colors.focusedDay
						: theme.colors.backgroundApp
				}
			>
				<FloorText
					bg={
						currentFloor == floor
							? theme.colors.mainText
							: 'rgba(173, 173, 174, 1);'
					}
				>
					{floor}
				</FloorText>
			</FlorComponent>
		)
	}
	return (
		<ViewScreen>
			<SelectFloorContainer>
				{floors.map(floor => (
					<FloorsSelector key={floor} floor={floor} />
				))}
			</SelectFloorContainer>
			<SvgPanZoom
				canvasWidth={2600}
				canvasHeight={1250}
				minScale={0.35}
				maxScale={1}
				initialZoom={0.5}
				viewStyle={{
					backgroundColor: theme.colors.backgroundSubject
				}}
				canvasStyle={{ backgroundColor: theme.colors.backgroundSubject }}
			>
				{floorsComponents[currentFloor]}
			</SvgPanZoom>
		</ViewScreen>
	)
}

const ViewScreen = styled.View`
	height: 100%;
`
const SelectFloorContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: auto;
	background-color: ${props => props.theme.colors.backgroundSubject};
	z-index: 1;
`
const FlorComponent = styled.TouchableOpacity<StyledColor>`
	margin: 5px;
	height: 40px;
	width: 40px;
	background-color: ${props => props.bg};
	align-items: center;
	border-radius: 100px;
`

const FloorText = styled.Text<StyledColor>`
	text-align: center;
	min-height: auto;
	min-width: auto;
	font-weight: 400;
	font-size: 30px;
	color: ${props => props.bg};
	margin-right: 4%;
	margin-left: 4%;
	margin-top: 4%;
	margin-bottom: 4%;
`
