import React, { FC } from 'react'
import { Button, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

export const OnlineMap: FC = () => {
	return (
		<WebView source={{ uri: 'https://ischemes.ru/group/rtu-mirea/vern78' }} />
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	}
})
