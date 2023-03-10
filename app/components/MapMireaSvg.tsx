import { Button, StyleSheet, View } from 'react-native'
import SvgPanZoom from 'react-native-svg-pan-zoom'
import React, { FC, useState } from 'react'
import { FLOOR_0, FLOOR_1, FLOOR_2, FLOOR_3, FLOOR_4 } from './FloorMireaMap'
import { HeaderSchedule } from './ui/HeaderSchedule'
import styled from 'styled-components/native'

const floorsComponents = {
	'0': <FLOOR_0 />,
	'1': <FLOOR_1 />,
	'2': <FLOOR_2 />,
	'3': <FLOOR_3 />,
	'4': <FLOOR_4 />
}

const floors = ['0', '1', '2', '3', '4'] as const

export const OfflineMap: FC = () => {
	const [currentFloor, setCurrentFloor] = useState<typeof floors[number]>('2')
	const FloorsSelector: FC<{
		floor: typeof floors[number]
	}> = ({ floor }) => {
		return (
			<FlorComponent
				onPress={() => setCurrentFloor(floor)}
				testID={
					currentFloor == floor
						? 'rgba(250, 146, 146, 1)'
						: 'rgba(233, 233, 233, 1);'
				}
			>
				<FloorText
					testID={currentFloor == floor ? '#000000' : 'rgba(173, 173, 174, 1);'}
				>
					{floor}
				</FloorText>
			</FlorComponent>
		)
	}
	return (
		<ViewScreen>
			<SelectFloorContainer>
				{/* {floors.map(floor => (
					<Button
						title={floor}
						onPress={() => setCurrentFloor(floor)}
						color={currentFloor == floor ? 'green' : 'black'}
						key={floor}
					/>
				))} */}
				{floors.map(floor => (
					<FloorsSelector floor={floor} />
				))}
			</SelectFloorContainer>
			<SvgPanZoom
				canvasWidth={3000}
				canvasHeight={1900}
				minScale={0.35}
				maxScale={1}
				initialZoom={0.5}
				viewStyle={{ backgroundColor: 'white' }}
			>
				{floorsComponents[currentFloor]}
			</SvgPanZoom>
		</ViewScreen>
	)
}

const ViewScreen = styled.View`
	width: 100%;
	height: 100%;
`
const SelectFloorContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: auto;
	background-color: white;
`
const FlorComponent = styled.TouchableOpacity`
	margin: 5px;
	height: 40px;
	width: 40px;
	background-color: ${props => props.testID};
	align-items: center;
	border-radius: 100px;
`

const FloorText = styled.Text`
	text-align: center;
	min-height: auto;
	min-width: auto;
	font-weight: 600;
	font-size: 30px;
	/* font-size: 20;
	font-weight: bold; */
	//color: ;
	color: ${props => props.testID};
	margin-right: 4%;
	margin-left: 4%;
	margin-top: 4%;
	margin-bottom: 4%;
`
