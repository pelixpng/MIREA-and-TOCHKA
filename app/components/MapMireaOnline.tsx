import React, { FC } from 'react'

import { WebView } from 'react-native-webview'

export const OnlineMap: FC = () => {
	return (
		<WebView source={{ uri: 'https://ischemes.ru/group/rtu-mirea/vern78' }} />
	)
}
