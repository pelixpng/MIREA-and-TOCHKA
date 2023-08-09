import styled, { DefaultTheme } from 'styled-components/native'
import { StyledColor } from '../types/styled'


export const BackgroundContainer = styled.View<StyledColor>`
	background: ${props => props.theme.colors.backgroundApp};
	height: ${props => props.height};
`

export const ScrollContainer = styled.ScrollView`
	background: ${props => props.theme.colors.backgroundApp};
`
export const MainButton = styled.TouchableOpacity`
	padding: 10px;
	border-radius: 20px;
	background-color: ${props => props.theme.colors.backgroundSubject};
	margin-top: 20px;
	width: 97%;
	align-self: center;
	align-items: center;
`
export const MainButtonTitle = styled.Text`
	width: auto;
	height: auto;
	font-weight: 400;
	font-size: 20px;
	color: ${props => props.theme.colors.mainText};
`
export const DelimiterContainer = styled.View`
	padding: 10px;
	border-radius: 20px;
	background-color: ${props => props.theme.colors.focusedDay};
	margin-top: 20px;
	width: 97%;
	align-self: center;
	align-items: center;
`

export const SubjectContainer = styled.View`
	padding: 10px;
	border-radius: 20px;
	background-color: ${props => props.theme.colors.backgroundSubject};
	margin-top: 10px;
	margin-bottom: 10px;
	width: 97%;
	align-self: center;
`

export const NameSubjectText = styled.Text`
	width: 100%;
	font-weight: 400;
	font-size: 20px;
	line-height: 23px;
	color: ${props => props.theme.colors.mainText};
`

export const TimeSubjectText = styled.Text`
	width: 65%;
	height: auto;
	font-weight: 400;
	font-size: 16px;
	line-height: 23px;
	color: ${props => props.theme.colors.minorText};
`

export const TypePairText = styled.Text`
	text-align: center;
	width: auto;
	height: auto;
	font-weight: 400;
	font-size: 19px;
	color: ${props => props.theme.colors.mainText};
`

export const TypePair = styled.View<StyledColor>`
	align-items: center;
	width: 65%;
	height: 25px;
	background-color: ${props => props.bg};
	border-radius: 23px;
`

export const TypeContainer = styled.View`
	width: 19%;
	height: 30px;
`

export const TimeContainer = styled.View`
	width: 19%;
	min-height: 50px;
`

export const RoomText = styled.Text`
	font-weight: 400;
	font-size: 16px;
	text-align: left;
	color: ${props => props.theme.colors.minorText};
`

export const NameContainer = styled.View`
	width: 81%;
`
export const TimeAndNameContainer = styled.View`
	flex-direction: row;
`

export const TeacherText = styled.Text`
	font-weight: 400;
	font-size: 16px;
	color: ${props => props.theme.colors.minorText};
	left: 4;
	width: 95%;
`



// маленкая кнопка
export const SmallBbutton = styled.TouchableOpacity<StyledColor>`
	align-items: center;
	width: auto;
	height: auto;
	background: ${props => props.bg};
	border-radius: 10px;
`

export const SmallButtonText = styled.Text<StyledColor>`
	text-align: center;
	min-height: auto;
	min-width: auto;
	font-weight: 400;
	font-size: 20px;
	color: ${props => props.bg};
	margin-right: 4%;
	margin-left: 4%;
	margin-top: 4%;
	margin-bottom: 4%;
`




export const DynamicButton = styled.TouchableOpacity<StyledColor>`
	padding: 10px;
	border-radius: 20px;
	background-color: ${props => props.bg};
	margin-top: 20px;
	width: 97%;
	align-self: center;
	align-items: center;
`
export const DynamicButtonTitle = styled.Text`
	width: auto;
	height: auto;
	font-weight: 400;
	font-size: 20px;
	color: ${props => props.theme.colors.mainText};
`