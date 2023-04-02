import React, { FC } from 'react'
import styled from 'styled-components/native'
import { StyledColor } from '../../../types/styled'
import { SmallBbutton, SmallButtonText } from '../../UniversalComponents'

export const LabelNavigator: FC<{ name: string; focused: boolean }> = ({
	name,
	focused
}) => {
	return (
		<Headercontainer bg={focused ? '#fa9292' : '#e9e9e9'}>
			<SmallButtonText bg={focused ? '#212525' : '#ADADAE'}>
				{name}
			</SmallButtonText>
		</Headercontainer>
	)
}

const Headercontainer = styled.View<StyledColor>`
	align-items: center;
	width: auto;
	height: auto;
	background: ${props => props.bg};
	border-radius: 10px;
`

// const TextCont = styled.Text<StyledColor>`
// 	text-align: center;
// 	min-height: auto;
// 	min-width: auto;
// 	font-weight: 600;
// 	font-size: 20px;
// 	color: ${props => props.bg};
// 	margin-right: 4%;
// 	margin-left: 4%;
// 	margin-top: 4%;
// 	margin-bottom: 4%;
// `
