import { AntDesign } from '@expo/vector-icons'
import { FC, useEffect, useMemo, useState } from 'react'
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import { Circle, Image, Path, SvgXml } from 'react-native-svg'
import SvgPanZoom from 'react-native-svg-pan-zoom'
import Floor4 from './Floor4.svg'
import React from 'react'
import { FLOOR_0, FLOOR_1, FLOOR_2, FLOOR_3, FLOOR_4 } from './FloorMireaMap'

export const OfflineMap: FC = () => {
	const [floor, setFloor] = useState('2')
	// useEffect(() => {

	// }, [floor]);
	const tmp = ['0', '1', '2', '3', '4']

	return (
		<View style={{ width: '100%', height: '100%' }}>
			<View style={styles.subject}>
				{tmp.map(item => (
					<Button
						title={item}
						onPress={() => setFloor(item)}
						color={floor == item ? 'green' : 'black'}
						key={item}
					/>
				))}
			</View>
			<SvgPanZoom
				canvasWidth={3000}
				canvasHeight={1900}
				minScale={0.35}
				maxScale={1}
				initialZoom={0.5}
				viewStyle={{ backgroundColor: 'white' }}
			>
				{
					{
						'0': <FLOOR_0 />,
						'1': <FLOOR_1 />,
						'2': <FLOOR_2 />,
						'3': <FLOOR_3 />,
						'4': <FLOOR_4 />
					}[floor]
				}
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
