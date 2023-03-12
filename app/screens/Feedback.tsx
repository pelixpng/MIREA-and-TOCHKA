import React, { FC } from 'react'
import { Button, Linking, Text, View } from 'react-native'

export const FeedBack: FC = () => {
	return (
		<View>
			<Button
				title='telegram'
				onPress={() => Linking.openURL('https://t.me/paveldur0')}
			></Button>
		</View>
	)
}
