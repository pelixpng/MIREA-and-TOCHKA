import React, { FC } from 'react'
import { Button, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { useReduxSelector } from '../redux'
import DaysNavigation from '../navigation/DaysNavigation'
import { WebView } from 'react-native-webview'

const UniversityMap: FC = () => {
	const runFirst = `
	document.getElementByClassName("bg-white py-1 shadow-lg")[0].style.display = 'none';
    true; 
    `
	return (
		<WebView
			source={{ uri: 'https://ischemes.ru/group/rtu-mirea/vern78' }}
			// injectedJavaScript={runFirst}
			injectedJavaScript={
				'function injectRules() {' + runFirst + '};injectRules();'
			}
			injectedJavaScriptBeforeContentLoaded={
				'function injectRules() {' + runFirst + '};injectRules();'
			}
			injectedJavaScriptForMainFrameOnly={true}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	}
})

export default UniversityMap
