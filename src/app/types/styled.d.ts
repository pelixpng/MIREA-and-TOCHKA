
export interface StyledColor {
	bg?: string,
    height?: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors:{
        backgroundApp: string,
        backgroundSubject: string,
        mainText: string,
        minorText: string,
        dopWeekText: string,
        headerDayItem: string,
        numberDayText: string,
        weekDayText: string,
        focusedDay: string,
        headerButton: string,
        headerButtonText: string,
        statusBarText: string,
        dynamicButton: string
    },
    names:{
      themeName: ThemeNameType
    }
  }
}