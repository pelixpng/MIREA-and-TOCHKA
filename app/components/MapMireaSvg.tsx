import { Button, StyleSheet, View } from 'react-native'
import SvgPanZoom from 'react-native-svg-pan-zoom'
import React, { FC, useState } from 'react'
import { FLOOR_0, FLOOR_1, FLOOR_2, FLOOR_3, FLOOR_4 } from './FloorMireaMap'
import { HeaderSchedule } from './ui/HeaderSchedule'

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

	return (
		<View style={{ width: '100%', height: '100%' }}>
			<View style={styles.subject}>
				{floors.map(floor => (
					<Button
						title={floor}
						onPress={() => setCurrentFloor(floor)}
						color={currentFloor == floor ? 'green' : 'black'}
						key={floor}
					/>
				))}
			</View>
			<SvgPanZoom
				canvasWidth={3000}
				canvasHeight={1900}
				minScale={0.35}
				maxScale={1}
				initialZoom={0.5}
				viewStyle={{ backgroundColor: '#ffffff' }}
			>
				{floorsComponents[currentFloor]}
			</SvgPanZoom>
		</View>
	)
}

const styles = StyleSheet.create({
	subject: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
