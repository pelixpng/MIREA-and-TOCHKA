import { FC, useEffect } from 'react'
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
	//через скрипт также будем менять цвета страницы в зависимости от темы
	const runFirst = `
	setTimeout(() => document.getElementsByClassName('bg-white py-1 shadow-lg')[0].style.display = 'none', 300)
	`
	// const runFirst = `
	// 	items = document.querySelectorAll('.class[style="background-color: #ffffff"]');

	// 	items.forEach(function(i){
	// 		i.style.color = '#ff6f6f';
	// 	});
	// `

	// document.getElementsByClassName('main-header')[0].style.display = 'none';
	//   true; // note: this is required, or you'll sometimes get silent failures
	return (
		<WebView
			source={{ uri: 'https://ischemes.ru/group/rtu-mirea/vern78' }}
			injectedJavaScript={runFirst}
		/>
	)
}
