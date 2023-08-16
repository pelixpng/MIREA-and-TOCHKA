import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store, { useReduxSelector } from './app/redux'
import { RootApp } from './RunApp'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components/native'
import { DarkTheme, LightTheme } from './app/components/Themes'
import { useColorScheme } from 'react-native'
import { Storage } from './app/Storage/Storage'
import { AppDontWork } from './app/screens/AppDontWorkScreen'

export default function App() {
	const colorScheme = useColorScheme()
	const [theme, setTheme] = useState<string | null>()

	const getColorScheme = () => {
		const theme = Storage.getString('theme')
		if (theme == 'Тёмная') {
			return 'dark'
		} else if (theme == 'Светлая') {
			return 'light'
		} else {
			return colorScheme
		}
	}

	useEffect(() => {
		setTheme(getColorScheme())
	})

	return (
		<ThemeProvider theme={theme == 'light' ? LightTheme : DarkTheme}>
			<Provider store={store}>
				<RootApp />
			</Provider>
		</ThemeProvider>
	)
}
