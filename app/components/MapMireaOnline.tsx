import React, { FC, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { useReduxSelector } from '../redux'
import AlertModalService from '../utilities/AlertModal'

export const OnlineMap: FC = () => {
	const ifOffline = useReduxSelector(state => state.counter.isAppOffline)
	useEffect(() => {
		if (ifOffline) {
			AlertModalService.noInternetForMap()
		}
	}, [ifOffline])

	return (
		<WebView source={{ uri: 'https://ischemes.ru/group/rtu-mirea/vern78' }} />
	)
}
