import { DefaultTheme } from "styled-components/native";


export const LightTheme: DefaultTheme =  {
    colors: {
        backgroundApp: '#e9e9e9',
        backgroundSubject: 'white',
        mainText: '#212525',
        minorText: 'rgba(33, 37, 37, 0.83)',
        dopWeekText: '#ADADAE',
        headerDayItem: '#e9e9e9',
        numberDayText: '#ADADAE',
        weekDayText: '#212525',
        focusedDay: '#fa9292',
        headerButton: 'rgba(0, 255, 144, 0.2)',
        headerButtonText: '#4dc591',
        statusBarText: 'dark',
        dynamicButton: 'rgba(0, 255, 144, 0.2)'
    },
    names:{
        themeName: 'LIGHT'
    }
};

export const DarkTheme: DefaultTheme =  {
    colors: {
        backgroundApp: '#191A1F',
        backgroundSubject: '#1F222B',
        mainText: 'white',
        minorText: '#646772',
        dopWeekText: 'white',
        headerDayItem: '#1F222B',
        numberDayText: '#646772',
        weekDayText: 'white',
        focusedDay: '#546BC5',
        headerButton: '#1F222B',
        headerButtonText: 'white',
        statusBarText: 'light',
        dynamicButton: 'rgba(0, 255, 144, 0.4)'
    },
    names:{
        themeName: 'DARK'
    }
};

